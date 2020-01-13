# Green Solution

This website is made for Vietnam Sach Va Xanh organization. We didn't get the part but here's the website anyways.

## Getting Started

This is the client folder, if you want it to run, please first clone the entire project to your machine, open a terminal and go to the /client directory of this repository, then run:

### `npm install` or `npm i`

to install all of the packages needed for this website

## Run

Simply run this command:

### `npm start`

to start the website. The website should run on http://locahost:8000 on your browser.

## Deployment

This website is deployed with Firebase Hosting and AWS Beanstalk, but the AWS version does not last long because AWS charges quite a lot of money to keep a website running.

To deploy the webiste, first run:

### `npm run build`

to bundle the website, a build folder should be created after the build is done.

Then run:

### `firebase deploy`

to deploy this website to your Firebase Hosting server (I won't cover how to set up one).

## Built With

* [ReactJS](https://reactjs.org/) - Very neat Frontend library for web development
* [Redux](https://redux.js.org/) - State container for JS Applications, we use this library to manage our states, and for UI effects (loading, etc)
* [Material UI + Material UI Icons](https://material-ui.com/) - CSS + Animation all in one package


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thanks Triet, a Quang and Boi for making this website, great work guys!
