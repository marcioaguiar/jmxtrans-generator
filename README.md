# jmxtrans-generator

Easily generate [jmxtrans](https://github.com/jmxtrans/jmxtrans) configuration files.

The way jmxtrans configuration file is structured
forces you to repeat configurations in multiple places.

jmxtrans-generator decouples the three main properties
of the configuration file and allow the reuse of such.

## Using jmxtrans-generator

```shell
node generator.js [input] [output]
```

- **input** - the input file
- **output** - the file where to save the generated jmxtrans configuration

## Input file format

The input file must be a JSON file with exact three attributes

```json
{
	"servers": [],
	"outputWriters": [],
	"queries": []
}

```

See jmxtrans [queries documentation] (https://github.com/jmxtrans/jmxtrans/wiki/Queries) for an explanation of each property.

You can see the [example-configuration] (https://github.com/marcioaguiar/jmxtrans-generator/blob/master/example-configuration.json) for further details.
