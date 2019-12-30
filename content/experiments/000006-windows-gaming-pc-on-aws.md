---
title: Create your own Windows Gaming PC on AWS
path: /experiments/windows-gaming-pc-on-aws
date: "12-30-2019"
metaTitle: "Create your own Windows Gaming PC on AWS"
metaDescription: "Create your own Windows Gaming PC and Workspace on AWS"
---

[Google Stadia](https://en.wikipedia.org/wiki/Google_Stadia) recently came out and one of the interesting things about it is that it streams games from the cloud to your devices. I had previously built a gaming PC around 10 years ago with an Nvidia GTX 260 and an Intel Core i5-750 (eventually upgraded to Nvidia 750 Ti). I hadn’t used the PC in a while and my [experiments](https://suyogs.com/experiments/000005-vscode-online) with setting up VSCode on AWS got me thinking about setting up my own Gaming server on AWS too. Since this was an ideal use case for the cloud (an on demand machine that I use infrequently and will be consistently upgraded with the most recent GPUs), I wanted to see how I could setup a Windows PC on the AWS to play my Steam games.

## Why would you want this?

I don’t usually use a PC for work or personal use (have a MacBook Pro for both) and I didn’t want to deal with purchasing expensive new GPUs or building a brand new PC. One of my overall visions for the future of computing is using thin(er) clients to connect to personalized workspaces in the cloud for all kinds of computing needs (Development work, Gaming, a different operating system when you need it). Amazon came out with [Amazon Workspaces](https://aws.amazon.com/workspaces/) for this reason (and for enterprise management of data and apps in those workspaces), but their pricing for individuals is [insane](https://aws.amazon.com/workspaces/pricing/) (as of this writing $735 per month or $22 + $1.75/hr for their minimal 8 vCPU, 15GB memory, 4GB GPU Memory machines). I thought that I could do better by using AWS directly with VMs. With this setup, I can get continuous hardware updates as AWS upgrades their machines, and I can stream my already purchased Steam games to my Mac, iPad, or iPhone.

## What GPU machines are available on AWS and Pricing

AWS is always upgrading their machines, so as of January 1st, 2020 - their cheapest **current** instance with a GPU is a [g4dn.xlarge](https://aws.amazon.com/ec2/instance-types/g4/) - a VM with 4 vCPUs, 16GB memory, and an hourly price of $0.526/hr on demand. Spot prices are currently only $0.19/hr (not including bandwidth or EBS Disk space). 

These machines actually use [Nvidia T4](https://www.nvidia.com/en-us/data-center/tesla-t4/) GPUs, which are current generation GPUs built primarily for Cloud Providers. They’re about 1/2 as powerful as the current top of the line 2080 Ti in [compute](https://www.anandtech.com/show/14663/the-nvidia-geforce-rtx-2080-super-review), but have more graphics memory since they’re mainly used for professional scientific computing (specifically Machine Learning use cases).

## Operating System and Specs

For this guide, we’ll be setting up a g4dn.xlarge with Windows Server 2019. After using Remote Desktop to authenticate to the server, we’ll download Nvidia drivers, setup some common applications we need and get Steam Link working. A brief outline of what we’ll do is below:

- Login to AWS Console and start a new Windows Instance (On Demand) with a g4dn.xlarge VM. Add a 128GB EBS Drive to the machine as well
- Setup a Security Group with the following ports open: 
    - TCP 22 for SSH
    - TCP 3389 for RDP
    - TCP 27036 for Steam TCP 1
    - TCP 27037 for Steam TCP 2
    - UDP 27031 for Steam UDP 1
    - UDP 27036 for Steam UDP 2
- Once you get the password for Remote Desktop, login using RDP
- Disable Edge download restrictions, download Chrome, get Nvidia Graphics Drivers and GRID drivers (restart after installation)
- Disable Windows Basic Display driver
- Download Steam and login to your account
- Download Hamachi VPN on your server (will also need to download & install on your clients)
- Use Steam Link to stream games to your client

Optional:
- Since this is a full fledged remote workspace, you can download and use other GPU based tools (Blender, Maya, Photoshop) via RDP - although lag may be more noticeable through RDP and it might be better to do local development and use the remote server for rendering or when you need more compute

## Guide

TODO: From here

## References

- https://lg.io/2015/07/05/revised-and-much-faster-run-your-own-highend-cloud-gaming-service-on-ec2.html - Primarily used this and adapted for Windows Server 2019 and newer Nvidia drivers
