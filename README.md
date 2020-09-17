<img src="https://cloud.githubusercontent.com/assets/668093/12567089/0ac42774-c372-11e5-97eb-00baf0fccc37.jpg" alt="OpenMRS"/>

# iDeliver UI

This repository contains the iDeliver UI OpenMRS Open Web App.

The apps communicates with [iDeliver REST](https://gitlab.com/VecnaCares/ideliver-rest) API module

For further documentation about OpenMRS Open Web Apps see
[the wiki page](https://wiki.openmrs.org/display/docs/Open+Web+Apps+Module).

## Development

### Production Build

You will need NodeJS 8+ installed to do this. See the install instructions [here](https://nodejs.org/en/download/package-manager/).

Once you have NodeJS installed, install the dependencies (first time only):

```sh
npm install
```

Build the distributable using [Webpack](https://webpack.github.io/) as follows:

```sh
npm run build:prod
```

This will create a file called `ideliver.ui.zip` file in the `dist` directory,
which can be uploaded to the OpenMRS Open Web Apps module.

### Local Deploy

To deploy directly to your local Open Web Apps directory, run:

```
npm run build:deploy
```

This will build and deploy the app to the `$HOME/openmrs/$SERVER_ID/owa`
directory. To change the deploy directory, edit the `LOCAL_OWA_FOLDER` entry in
`config.json`. If this file does not exists, create one in the root directory
that looks like:

```js
{
  "LOCAL_OWA_FOLDER": "$HOME/openmrs/$SERVER_ID/owa"
}
```

### Live Reload

To use [Browersync](https://www.browsersync.io/) to watch your files and reload
the page, inject CSS or synchronize user actions across browser instances, you
will need the `APP_ENTRY_POINT` entry in your `config.json` file:

```js
{
  "LOCAL_OWA_FOLDER": "$HOME/openmrs/$SERVER_ID/owa",
  "APP_ENTRY_POINT": "http://localhost:8080/openmrs/owa/ideliver.ui/index.html"
}
```

Run Browsersync as follows:

```
npm run watch
```

### Linking to a local version of vc-ui

#### Linking
First, in the vc-ui folder (where package.json is):
```bash
npm link
```
Then in this project link the module:

```bash
npm link vc-ui
```

#### Unlinking

In this project
```bash
npm unlink --no-save vc-ui
```

In vc-ui project
```bash 
npm unlink
```

See https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be
and https://docs.npmjs.com/cli/link for more info about linking

### Extending

Install [npm](http://npmjs.com/) packages dependencies as follows:

```sh
npm install --save <package>
```

To use the installed package, import it as follows:

```js
//import and assign to variable
import variableName from "package";
```

To contain package in vendor bundle, remember to add it to vendor entry point array, eg.:

```js
entry: {
  app : `${__dirname}/app/js/owa.js`,
  css: `${__dirname}/app/css/owa.css`,
  vendor : [
    'package',
    ...//other packages in vendor bundle
  ]
},
```

Any files that you add manually must be added in the `app` directory.

### Troubleshooting

##### [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

You may experience problems due to the `Access-Control-Allow-Origin` header not
being set by OpenMRS. To fix this you'll need to enable Cross-Origin Resource
Sharing in Tomcat.

See instructions [here](http://enable-cors.org/server_tomcat.html) for Tomcat 7 and [here](https://www.dforge.net/2013/09/16/enabling-cors-on-apache-tomcat-6/) for Tomcat 6.

## License

[MPL 2.0 w/ HD](http://openmrs.org/license/)
