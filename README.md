# Cloudport Daemon (cloudportd)

## Overview
Cloudport Daemon is the daemon for the Cloudport Panel.


We are inspried by Skyport panel and Prism!!
This was made as a fun little project in Node.js!!
For a better and safer version please check out Airlink!!

## Installation
1. Clone the repository:
`git clone https://github.com/CloudportLabs/cloudportd`

2. Install dependencies:
`npm install`

3. Configure Cloudportd:
- Login to your panel as a admin >> Click on "Nodes" >> Click on the "Create New" button >> Fill in the details
- Once all the details are filled, press the "Create" button
- Find the name of the node that you just created in the list and click on the "Configure" button and copy the token that was generated.
- Paste it in this script
- And your done Congrats!!

4. Start the Daemon:
`node . # or use pm2 to keep it online`

## Configuration
Configuration settings can be adjusted in the `config.json` file. This includes the authentication key for API access.

## Usage
The daemon runs as a background service, interfacing with the Cloudport Panel for operational commands and status updates. It is not typically interacted with directly by end-users for security reasons.

## Contributing
Contributions to enhance the functionality or performance of the Cloudport Daemon are encouraged. Please submit pull requests for any changes.

## License
(c) 2025 is.a.duck or Duck1405 and contributors. This software is licensed under the MIT License.
