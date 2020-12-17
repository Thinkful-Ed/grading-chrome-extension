## Bloc / Thinkful Grading Chrome Extension

Chrome extension for graders to auto fill with a grading signature and greeting

### Video walk through

[http://nikib.ro/wn/screenshots/grading-chrome-extension-update.mp4](http://nikib.ro/wn/screenshots/grading-chrome-extension-update.mp4)

### Installation instructions

- Download or clone this repo (If you download the zip you will need to unzip the file)
- In Chrome go to [chrome://extensions/](chrome://extensions/)
- Turn on developer mode
- ![developer mode](http://nikib.ro/wn/screenshots/Extensions_2018-04-09_08-05-18.jpg)
- Click on `load unpacked` and browse to the extension files that you cloned or downloaded
- Thats it!
- To refresh the page (when you pull from the repo or make changes) you can click on the refresh 
icon.

### Usage
<img src="https://thinkful-ed.github.io/grading-extension-sandbox/options.png" alt="drawing" width="200"/>

- Open the options by clicking on the chrome extension icon.
- Enter your name and the program you're grading.
- Go to any submission that you've claimed from the grading queue and the snippet will be added
 on page load. It will automatically adapt to the program you selected.
- Changing the program while grading will automatically re-populate the text field, this is 
useful to avoid refreshing the page, but be careful as it will override anything you wrote before.
- You can also customize the intro message from the default to your own.

### Admin
- Programs and messages can be maintained in programs.js
- Testing sandbox at https://thinkful-ed.github.io/grading-extension-sandbox/
