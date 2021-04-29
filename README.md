### Installation and usage

First, install Node.js if you haven't already had one in your system. [Click here to download Node.js] (https://nodejs.org/en/). Once you have installed it, open Command Prompt and run "node -v" to check if you have the latest version.

Next, install Android Studio (Windows)/ XCode (MacOS)/ ExpoGo (Mobile App), as your emulator to run this application. _We recommend using ExpoGo since it is the easiest one to install and does not require further path configuration._

Finally, install expo in your system by typing "npm install -g expo-cli". Once it finish installing, you can start running the project.

### Running the project

1. Clone this repository by using Command Prompt

```
git clone https://github.com/schrish21/PetPals.git
cd pet-pals
```

or downloading the file from branch Main -> Code -> Download ZIP. Then navigate to the project folder by cd on Command Prompt. Once you are in the right project directory, you can start installing all the project dependencies.

2. Install packages dependencies

```
npm install --save --legacy-peer-deps
```

3. Once the installation is complete with no errors, run expo by typing on command prompt

```
expo start -c
```

A web browser will open. Under 'connection' choose Tunnel, wait for it to say "tunnel ready", Then scan the barcode using your phone and it should open up the ExpoGo application on your phone.
