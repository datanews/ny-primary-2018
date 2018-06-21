# ny-primary-2018

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd ny-primary-2018`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


## Required S3 config
```
<RoutingRules>
  <RoutingRule>
    <Condition>
      <HttpErrorCodeReturnedEquals>403</HttpErrorCodeReturnedEquals>
<KeyPrefixEquals>ny-primary-2018/</KeyPrefixEquals>
    </Condition>
    <Redirect>
      <HostName>staging.project.wnyc.org</HostName>
      <ReplaceKeyPrefixWith>ny-primary-2018/#</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
</RoutingRules>
```

## generating a topojson file from census shapefiles
### requirements
- `ogr2ogr`
 - mac os install: `brew install gdal`
- `topojson`: `npm i -g topojson`

### steps
- pull down latest shapefiles from census.gov
 - https://www.census.gov/geo/maps-data/data/cbf/cbf_cds.html
 - use the 20m resolution level
- generate geojson from the shapefile (`.shp`)
 - `$ ogr2ogr -f GeoJSON districts.json <shapefile>.shp -sql "SELECT CAST(CD115FP AS INTEGER) AS district FROM <shapefile> where STATEFP='36'"`
 - note using the `.shp` extension in the command and leaving off the extension in the SQL
- compress
 - `$ gzip -9 geo.json`
 - `$ mv geo.json.gz geo.json`
- upload to S3
 - set Content Type header to `application/json`
 - set Content Encoding header to `gzip`

## creating an ical file

run the following from the command line

```
$ npm run cal
```

This will generate `primary.ics` in your current working directory and upload it to S3.

Specify the name of the event with the `CAL_CONTENT` envvar.
Specify the location of the uploaded file with the `AWS_BUCKET` and `AWS_PREFIX` envvars. `/assets/primary.ics` will be appended to create the final location.
