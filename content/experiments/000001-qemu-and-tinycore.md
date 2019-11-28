---
title: "QEMU and Tinycore Linux"
path: /experiments/qemu-and-tinycore
date: "11-28-2019"
metaTitle: "QEMU and Tinycore Linux 10.1"
metaDescription: "Experimenting with Tinycore Linux and QEMU"
---

Experiment working with QEMU and Tinycore linux on a Mac.

# Setup

On a Mac, get [QEMU](https://www.qemu.org/) by using [Homebrew](https://brew.sh/)

```shell
brew install qemu
```

Download Core-current.iso and TinyCore-current.iso from Tinycore's [website](http://tinycorelinux.net/downloads.html). For the experiment below, they are located in my Downloads folder `~/Downloads/`.

# Experiment

```shell
mkdir qemutests
cd qemutests 
qemu-img create tinycore.img 512M
qemu-system-x86_64 -hda tinycore.img -m 512 -cdrom ~/Downloads/Core-current.iso -boot d -net nic -net user,hostfwd=tcp:127.0.0.1:8008-:80
```

Note that you **must** have that second -net command to download things properly.

Qemu will open up a window and booting from the iso should only take 10 seconds.

If you logout, there’s a user with the name “tc” that you can login as again.

If you sudo reboot right now before following the "install" instructions below, you will lose all data in the VM since the entire OS is running in memory and is not persisted to the qemu-img disk you created earlier.

## Extensions

To download extensions (like packages in Ubuntu or CentOS), you can use [tce-load](http://wiki.tinycorelinux.net/wiki:tce-load).

```shell
tce-load -iw vim
tce-load -iw python3.6-dev
```

Note that I was having multiple issues around md5sum mismatches when installing extensions using tce-load. This happened for both the shell based Core and GUI based TinyCore.

You can partially get around the md5 check by using tce-fetch, but this is not recommended for most non-experimental purposes.

```shell
tce-fetch.sh gvim.gcz
tce-load -i gvim.gcz
```

In my few hours of experimenting, I wasn't able to find out a good fix for the md5sum issues. Feel free to leave an [issue](https://github.com/Flux159/blog/issues) on my blog's github if you're able to find a fix.

## Installing to Disk

This is mainly following TinyCore's [install manual](http://tinycorelinux.net/install_manual.html) for making a bootable hard drive w/ tiny core rather than just the iso booting in QEMU.

```shell
tce-load -wi cfdisk
tce-load -wi grub-0.97-splash
sudo su
fdisk -l (should show /dev/sda - which will be used for following commands)
cfdisk /dev/sda

# The following is in the cfdisk terminal interface
[New] [Primary] [Enter for default] [Beginning] [Bootable - select this]
[Write]
yes
[Quit]

mkfs.ext3 /dev/sda1
rebuildfstab

mount /mnt/sda1
mkdir -p /mnt/sda1/boot/grub

# Mount the original boot media (the disk) - it was at /dev/sr0 (just did cat /etc/fstab to check):
mount /mnt/sr0
cp -p /mnt/sr0/boot/* /mnt/sda1/boot/
mkdir -p /mnt/sda1/tce
touch /mnt/sda1/tce/mydata.tgz

cp -p /usr/lib/grub/i386-pc/* /mnt/hda1/boot/grub/
vi /mnt/hda1/boot/grub/menu.lst

# Type “i”, insert the following (note that the install_manual is out of date - follow this: http://forum.tinycorelinux.net/index.php?topic=15713.0):

default 0
timeout 10
title tinycore
kernel /boot/vmlinuz quiet
initrd /boot/core.gz

# Use Esc + :wq to save the file and quit

grub
root (hd0,0)
setup (hd0)
quit

umount /mnt/hdc
eject /dev/hdc

reboot
```

Note that cfdisk, etc. have been deleted because they were installed on the temporary iso, but now that you’ve installed to disk, the next time you run qemu, you can just boot from disk:

```shell
qemu-system-x86_64 -hda tinycore.img -m 512 -boot d -net nic -net user,hostfwd=tcp:127.0.0.1:8009-:80 
```

# References
- http://tinycorelinux.net/faq.html - Tinycore's FAQ
- http://tinycorelinux.net/install_manual.html - Tinycore's Install Manual
- http://forum.tinycorelinux.net/index.php?topic=15713.0 - Forum post about changes to grub configuration
- https://jon.sprig.gs/blog/post/53 - useful to start experimenting with Qemu arguments
