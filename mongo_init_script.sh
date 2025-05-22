#!/bin/bash

mongoimport --host localhost:27017 --db casamento --collection items --type csv --headerline --file ./items_parsed.csv