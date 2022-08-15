import { createMap } from './main.js';
import { DARTVectorLayer } from './vector_layers.js';

window.onload = createMap(-13200000, 5850000, DARTVectorLayer, "./data/json/DARTriverinventory4map.json", "www.cbr.washington.edu/dart/cs/php/rpt/mg.php?mgconfig=river&amp;outputFormat=plotImage&amp;tempUnit=F&amp;startdate=1/1&amp;enddate=12/31&amp;avgyear=0&amp;consolidate=1&amp;grid=1&amp;y1min=&amp;y1max=&amp;y2min=&amp;y2max=&amp;size=medium");