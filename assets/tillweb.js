// NB nothing is going into the global scope unless we take special
// action to put it there.

// jquery
require("expose-loader?exposes=$,jQuery!jquery");

// bootstrap
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');
//import * as bootstrap from 'bootstrap';

// select2
require('select2/dist/css/select2.css');
require('@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css');
require('select2');

// datatables
require('datatables.net-bs4/css/dataTables.bootstrap4.css');
require('datatables.net-bs4');

// We need to do this to get DataTable into the global scope, because
// the quicktill templates rely on it
window.DataTable = $.fn.DataTable;

// tablesorter
require('tablesorter');

// Chart.js
import Chart from 'chart.js/auto';
window.Chart = Chart;

import Sortable from 'sortablejs';
window.Sortable = Sortable;
