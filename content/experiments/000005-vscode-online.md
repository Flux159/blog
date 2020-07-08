---
title: VSCode Online with AWS
path: /experiments/vscode-online-with-aws
date: "11-29-2019"
metaTitle: "VSCode Online with AWS"
metaDescription: "Working with a remote devserver on AWS with VSCode Online"
---

NOTE: This post is deprecated as VSCode Online added the ability to start a vscode server without a UI after rebranding to Visual Studio Codespaces.
[Github Codespaces](https://github.com/features/codespaces/) would probably use something similar and would be a better overall experience than manually setting
up an instance on AWS.

I'm writing this blog post using [VSCode Online](https://visualstudio.microsoft.com/services/visual-studio-online/) using a hosted environment on AWS.

This is pretty awesome as it lets me use VSCode from a webbrowser to connect to a VM running on my AWS account.

This post goes over how I set it up, what works, and how I believe that remote development like this is not just the future, but also a critial part of what Github (now owned by Microsoft) will offer in the future.

# Why Remote Development

- Can access from anywhere
- A single browser for all your apps (VSCode, Terminal, Google, etc.)
- Save on costs & pay for what you use - if you need a larger machine, just shutdown the instance, get a bigger one for a few hours. Works extremely well with the On Demand / Spot instance model of pricing (if backups & temporary non-committed state handled seamlessly)
- Should definitely be automated so that a disconnect from the environment can run a command to shutdown the instance. Should also be able to run a lambda or Azure function in order to "boot up" a self-hosted instance too (saves on costs significantly)
- Can be automated so that load from a setup image, does a git pull (if necessary), has environment already configured
- Not local & on a virtual machine, so any issues with client computer (hard drive breaks, etc.) won't happen. Also if VM gets corrupted / in a bad state, just make a new VM from a backed up image
- **Potentially** Access from phone in the *near* future.
- **Potentially** Github "edit in vscode" that will spawn an environment automatically and let me edit the repository with an IDE like experience.

# Setup

- Get an AWS account - this entire setup is much easier if you just use Azure, but this guide is specifically for people on a different cloud provider (using a VM in Google Cloud or Digital Ocean with VSCode Online will be very similar)
- Start a new instance - I used a T2.Medium since it has 4GB RAM and 2 Virtual Cores
- Start with a terminal based Ubuntu 18.04 instance
- Follow instructions to setup machine with a GUI, Setup VNC server properly
- In VNC server, get vscode (there was an error here around X11, fix that) - Mac can use Finder as client. Note that GUI is pretty barebones, you want to get Firefox to just download VSCode quickly.
- Once VSCode is installed (via .deb), download the VSCode Online extension
- Use the command palette and follow the instructions to setup a local environment
- Note that you need to have a vscode online account AND an Azure account here
- The azure account also needs to have a subscription "plan" for VSCode online even though you won't be using their environments
- Once environment is setup, you want to connect to the environment from https://online.visualstudio.com
- In the environment, you'll automatically connect to the folder you specified as the workspace
- Change the max file watchers so that VSCode doesn't complain (and node/yarn don't complain)
- I wanted to work with a Nodejs app and also do Jupyter development, so I also set those up.

# Step by Step

Systematic way of setting up an Ubuntu Environment with xfce4, Chrome, VSCode, Nodejs, and Jupyter for web based remote development from any device.

# Getting an AWS Instance and setting up the right security group

Get an instance - I got a t3.medium with 2 VCPUs and 4GB RAM. I also attached a 32GB SSD Disk to the VM.

Make sure the Security Group is setup properly (inbound connections from these ports should be allowed):
```
Ports 8000-8001, 9000 for web development purposes 
Port 8888 for Jupyter
Port 22 for SSH
Port 5901 for VNC
```

Note that I usually limit the security group to only my IP since this is intended to be a development machine.

# Getting gnome-desktop and VNC setup on Ubuntu 18.04 Server

TODO: Update to use gnome-desktop rather than xfce4 which has odd bugs that cause it to crash frequently & the VNC connection needs to be re-established / VSCode environment needs to be refreshed.

Note: Replace `USER=suyogs` with the username you want to setup. When you add your user, it will ask for a password that will be used for authentication.

```shell
USER=suyogs
sudo apt update && sudo apt install -y ubuntu-desktop tightvncserver gnome-panel gnome-settings-daemon metacity nautilus gnome-terminal build-essential
sudo adduser $USER
sudo usermod -aG sudo $USER
```

```shell
su - $USER
```

As your `$USER`:

```shell
vncserver 
vncserver -kill :1
mv ~/.vnc/xstartup ~/.vnc/xstartup.bak
vim ~/.vnc/xstartup
```

Make some common directories for your user:
```
mkdir -p ~/Documents ~/Desktop ~/Downloads ~/Music ~/Pictures ~/Movies ~/Projects
```

In the `~/.vnc/xstartup` file, add the following:
```shell
#!/bin/bash

export XKL_XMODMAP_DISABLE=1
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

[ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup
[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources
xsetroot -solid grey
vncconfig -iconic &

gnome-session &
gnome-panel &
gnome-settings-daemon &
metacity &
nautilus &
# gnome-terminal &
```

Then run this in your `$USER`'s shell:

```shell
sudo chmod +x ~/.vnc/xstartup
vncserver
```

At this point, you should be able to connect to VNC on your Ubuntu machine by using a VNC Client (see below for clients on Mac and iPhone) and connecting to `vnc://YOUR_PUBLIC_IP:5901`. The next step will setup VNC to be a systemctl service that will spawn on boot.

To figure out your public ip from the terminal, you can just use the following command:
```shell
curl ifconfig.co
```

```shell
sudo vim /etc/systemd/system/vncserver@.service
```

In the `/etc/systemd/system/vncserver@.service` file, add the following (NOTE: Be sure to replace **YOUR_USER** with the username from above manually):

```text
[Unit]
Description=Start TightVNC server at startup
After=syslog.target network.target

[Service]
Type=forking
User=YOUR_USER
Group=YOUR_USER
WorkingDirectory=/home/YOUR_USER

PIDFile=/home/YOUR_USER/.vnc/%H:%i.pid
ExecStartPre=-/usr/bin/vncserver -kill :%i > /dev/null 2>&1
ExecStart=/usr/bin/vncserver -depth 24 -geometry 1280x800 :%i
ExecStop=/usr/bin/vncserver -kill :%i

[Install]
WantedBy=multi-user.target
```

Run the following to restart vnc:

```shell
vncserver -kill :1
sudo systemctl daemon-reload
sudo systemctl enable vncserver@1.service
sudo systemctl start vncserver@1
sudo systemctl status vncserver@1
```

You should now be able to reboot your machine and VNC will be setup on boot.

# Getting Chrome and VSCode Installed

```shell
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb 
wget -O code.deb https://go.microsoft.com/fwlink/?LinkID=760868
sudo dpkg -i code.deb 
rm code.deb 
```

Fix an issue around Code not booting in remote VNC/X sessions and install the VSOnline extension:
```
cd /usr/lib/x86_64-linux-gnu/
cp libxcb.so.1 libxcb.so.1.bak
sudo cp libxcb.so.1 libxcb.so.1.bak
sudo sed -i 's/BIG-REQUESTS/_IG-REQUESTS/' libxcb.so.1
cd ~
code --install-extension ms-vsonline.vsonline
```

At this point, you should be able to open up VNC, open VSCode and connect to your Azure account and VSOnline account. In addition, you want to [Register your local environment](https://docs.microsoft.com/en-us/visualstudio/online/how-to/vscode#self-hosted) so that it shows up at https://online.visualstudio.com

# Getting NodeJS and Yarn

This will get NodeJS and Yarn and update /etc/sysctl.conf so you don't run into file watcher errors from yarn or VSCode.

```shell
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
npm config set python python2.7
sudo vim /etc/sysctl.conf
```

Do the following change to sysctl to fix a common file watcher issue in yarn / vscode:

In the `/etc/sysctl.conf` File, add the following to the end of the file:

```
fs.inotify.max_user_watches=524288
```

Finally, run the following command:
```shell
sudo sysctl -p
```

# Getting Jupyter

As your $USER, do the following:
```
cd Downloads/
wget https://repo.anaconda.com/archive/Anaconda3-2019.07-Linux-x86_64.sh
bash ./Anaconda3-2019.07-Linux-x86_64.sh
```

You'll have to hit [Enter][Space], type `yes` to accept Anacondas license terms, [Enter] to confirm `/home/$USER/anaconda3` is the right location to install to, `yes` again to run conda init & update your PATH, then relogin to your user's shell session. If you run `python --version`, you should see Python 3.7+ now.

Now just run the following:
```
conda update --all --yes
jupyter notebook --ip=0.0.0.0
```

Jupyter will give a `?token=TOKEN` url in the logs, you should be able to access your Jupyter instance at `http://YOUR_PUBLIC_IP:8888?token=TOKEN` and work with notebooks there.

# Getting Postgres

Getting postgres setup for local database connections
```shell
sudo apt-get install -y postgresql
```

You should then be able to access a database locally using:
```
sudo -u postgres psql
```

# VNC

On a Mac, you can use Screen Sharing which is built into Finder (Command+K in Finder) and connect with a `vnc://YOUR_IP:5901` url.

On iPhone, use [VNC Viewer](https://apps.apple.com/us/app/vnc-viewer-remote-desktop/id352019548), just remove the "vnc://" from the connection, so `YOUR_IP:5901` should work.

# Troubleshooting

- Fallback to SSH via a terminal. Make sure to keep your AWS ssh key. Note that if you set sshd config to allow password auth, that might not work and you will need to login as your created user.
- Use VNC / Check if GUI is working properly via VNC. A follow up here is to setup vncserver to start on starup for the user you created. VNC will need to have VSCode running on the environment (unfortunately this looks like a limitation of the public beta right now)

## Debugging / Troubleshooting VNC

I had the VNC server crash sometimes - to debug, I first checked if SSH was still working - it might be that the VNC server crashed (which is necessary for VSCode to connect to the remote environment). If SSH isn't working, it might be that your VM crashed, check AWS's console to see if there's an issue / maybe reboot.

From an ssh session as your $USER, try the following:
```shell
sudo systemctl status vncserver@1.service
sudo systemctl restart vncserver@1.service
```

If there’s an error, try these to debug / figure out what the issue is:
```shell
vncserver -kill :1
sudo journalctl -xe
```

# What needs a bit more work

The VSCode online client seems to get stuck in a "Reconnecting" state, where its easier to just refresh the page / go back to the environments page and click on your environment again.

Right now there's some usability issues that could be resolved:
- I (manually) shutdown the instance to save on costs when I'm not using it. As soon as connection is lost, the instance should shutdown after 2 hours.
- I would love if I didn't have to use VNC at all (might be difficult since VSCode needs Electron which is based on Chrome, which needs a GUI environment to run). 
- AWS instances and Public IPs: The public IP of the instance changed, so I needed to ssh/vnc to a different host - need a script to automatically find the public ip based on the instance id (aws ec2 cli can give this, but it would be nicer to have a dynamic dns name that I could just hit from AWS). AWS has tutorials on how to do this w/ other services, but honestly Route 53 should just allow me to use an instance-id as an A Alias rather than a public IP (or have to go through some configuration setup on boot).
- After booting, I still need to manually VNC into the machine, open up VSCode, login TWICE using the same Microsoft credentials (login to Azure, then login to VSOnline's environments), then "Restore" the environment before I can access via webbrowser. All of this should be possible automatically - first, why isn't VSCode [storing](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#data-storage)/caching my credentials so that I'm automatically re-authenticated to Azure and VSOnline? Second, there should be some configuration where "Restoring" an environment can be automated/done via command-line and I should be able to start vscode via command line too (ie on boot).
- This manual process takes around 5 minutes, but its no where near as simple as "go to this webpage, you're already authenticated because its storing your auth in a cookie, here's your environment, get started immediately".

# The future

- Instant Github integration like Github Actions - "edit this repo" button built into Github that will automatically provision an environment, clone the repo, and start a build/prebuild command based on a repo's .workspace or .vsonline directory (similar to .github right now)
- Future: Coding from my phone (iPhone) - not necesarily on my phone's touchscreen, but with my phone connected via USB-C to a 4k monitor, bluetooth connection to keyboard & trackpad. Samsung already kinda has something like this with DeX, but this isn't trying to shoehorn another OS onto your phone - this should just be iOS (or Android), I should be able to go to https://online.visualstudio.com and connect to my devserver. Essentially I wouldn't need a laptop because I could carry my computing device in my pocket and connect to a higher resolution, larger screen whenever/where-ever I need to.
- Visual Studio online doesnt officially support Safari mobile yet

# References

- https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/ - Sign up for AWS
- https://aws.amazon.com/ec2/getting-started/ - Connecting to an instance (note that AWS has an online console now too, but I generally just use ssh with the downloaded keypair example: `ssh -i ~/.ssh/MY_KEYPAIR.pem ubuntu@MY_IP`).

- https://www.digitalocean.com/community/questions/ubuntu-16-04-creating-new-user-and-adding-ssh-keys - adding a new user in Ubuntu 18.04
- https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04 - getting xfce4 and vnc installed on ubuntu server. Also setting it up to start on reboot.

- https://visualstudio.microsoft.com/services/visual-studio-online/#signup - Sign up for VSCode Online
- https://code.visualstudio.com/docs/remote/vsonline#_selfhosted-environments - Self hosted environments with VSCode Online
- https://docs.microsoft.com/en-us/visualstudio/online/how-to/vscode#self-hosted

- https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc - Fixing file watchers issues 

- https://github.com/nodesource/distributions/blob/master/README.md - installing Nodejs on Ubuntu
- https://yarnpkg.com/lang/en/docs/install/#debian-stable - installing Yarn on Ubuntu

- https://mas-dse.github.io/startup/anaconda-ubuntu-install/ - Getting Jupyter
- https://jupyter-notebook.readthedocs.io/en/stable/public_server.html - Starting Jupyter notebook on ip=0.0.0.0

- https://stackoverflow.com/questions/48210972/xlib-extension-xinputextension-missing-on-display-1-atom-ubuntu - Fixing Xlib issue over VNC
