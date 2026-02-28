// NB nothing is going into the global scope unless we take special
// action to put it there.

// jquery
import jQuery from 'jquery';
window.jQuery = jQuery;
window.$ = jQuery;

// bootstrap
import './styles.scss';
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

// select2
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.css';
import 'select2';
$.fn.select2.defaults.set("theme", "bootstrap-5");

// datatables
import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
import DataTable from 'datatables.net-bs5';
DataTable.use(bootstrap);
window.DataTable = DataTable;

// tablesorter
import 'tablesorter';

// Chart.js
// import Chart from 'chart.js/auto';
// Only importing the parts of chart.js we use saves ~68k from the bundle
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(PieController);
Chart.register(ArcElement);
Chart.register(Tooltip);
Chart.register(Legend);
window.Chart = Chart;

import Sortable from 'sortablejs';
window.Sortable = Sortable;
