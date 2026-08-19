# Wordler

## Overview

This is a static web page that assists in solving Wordle puzzles. You can enter known good letters, known bad letters, known good letter positions and known bad letter positions.

It started out as a bash script that I have used for a few years. Then, I asked Claude AI to make a website out of it. After a few iterations, I got the functionality I was looking for. It isn't perfect, but it is what I wanted.

## Try it out

This project is live on the web at https://wordleassist.netlify.app/. Give it a test drive!

## iPhone App

A native SwiftUI iPhone app lives in the `ios/` directory with the same solver functionality as the web app.

### Run in Xcode

1. Open `ios/Wordler.xcodeproj` in Xcode.
2. Select your iPhone or a simulator as the run destination.
3. Set your **Signing Team** under the Wordler target if you want to run on a physical device.
4. Press Run (⌘R).

The app loads `words5.txt` from the bundle (same word list as the web app) and falls back to the embedded default list if needed.
