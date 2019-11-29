---
title: VSCode Online with AWS
path: /experiments/vscode-online-with-aws
date: "11-29-2019"
metaTitle: "VSCode Online with AWS"
metaDescription: "Working with a remote devserver on AWS with VSCode Online"
---

DRAFT

I'm writing this blog post using VSCode online using a hosted environment on AWS.

This is pretty awesome as it lets me use VSCode from a webbrowser to connect to a VM running in my AWS account.

This post goes over how I set it up, what works, and how I believe that remote development like this is not just the future, but also a critial part of what Github (now owned by Microsoft) will offer in the future.

# Why Remote Development

- Can access from anywhere
- Not local & on a virtual machine, so any issues with client computer (hard drive breaks, etc.) won't happen. Also if VM gets corrupted / in a bad state, just make a new VM from a backed up image
- Potential: Access from phone in the *near* future.

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
- Once environment is setup, you want to connect to the environment from online.visualstudio.com 
- In the environment, you'll automatically connect to the folder you specified as the workspace
- Change the max file watchers so that VSCode doesn't complain (and node/yarn don't complain)
- I wanted to work with a Gatsby app, and realized that a few things were different in the Ubuntu environment than on my Mac (python is defaulted to python 2, file watchers, no node.js / yarn until installed, etc.). These changes are for a different article on working with Node.js apps in Ubuntu.

# Troubleshooting

- Fallback to SSH via a terminal. Make sure to keep your AWS ssh key. Note that if you set sshd config to allow password auth, that might not work and you will need to login as your created user.
- Use VNC / Check if GUI is working properly via VNC. A follow up here is to setup vncserver to start on starup for the user you created. VNC will need to have VSCode running on the environment (unfortunately this looks like a limitation of the public beta right now)

# What needs a bit more work

Reconnections and loss of connection - I had an issue where I think the VNCServer got disconnected (and because password auth had been setup in sshd, I wasn't able to connect as 'ubuntu' with standard ssh key), so restarted VM - but online didn't reconnect automatically. I had to open up VSCode in another VNCServer session (after connecting as my user and restarting the vncserver), reconnect to Azure on the server (the authentication flow is really weird going through the web browser for MS login), then in the left panel, "Restore Local Environment" (VSCode doesn't let you make another environment with the same name / errors out if you do that). Then refresh the VSCode Online page with your environments & try to reconnect. Its not great if I have to have a VNC session open all the time just to connect to my environment, VSCode Online should just have a command line way of starting up (and setting up the remote environment - ideally w/out needing any GUI) and should seamlessly handle disconnections & reconnections. It should probably also daemonize itself so that it restarts on VM restart too. 

# The future

- Instant Github integration like Github Actions - "edit this repo" button built into VSCode that will automatically provision an environment, clone the repo, and start a build/prebuild command based on a repo's .workspace or .vsonline directory (similar to .github right now)
- Future: Coding from my phone (iPhone) - not necesarily on my phone's touchscreen, but with my phone connected via USB-C to a 4k monitor, bluetooth connection to keyboard & trackpad. Samsung already kinda has something like this with DeX, but this isn't trying to shoehorn another OS onto your phone - this should just be iOS (or Android), I should be able to go to online.visualstudio.com and connect to my devserver. Essentially I wouldn't need a laptop because I could carry my computing device in my pocket and connect to a higher resolution, larger screen whenever/where-ever I need to.
