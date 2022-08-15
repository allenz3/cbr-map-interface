import { createMap } from './main.js';
import { SacPASVectorLayer } from './vector_layers.js';

window.onload = createMap(-13450000, 4700000, SacPASVectorLayer, "./data/json/year_and_data_types_JLGedits.json", "www.cbr.washington.edu/sacramento/data/php/rpt/mg.php?mgconfig=river&amp;outputFormat=plotImage&amp;tempUnit=F&amp;startdate=1/1&amp;enddate=12/31&amp;avgyear=0&amp;consolidate=1&amp;grid=1&amp;y1min=&amp;y1max=&amp;y2min=&amp;y2max=&amp;size=medium");