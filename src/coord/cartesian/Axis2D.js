import * as zrUtil from 'zrender/src/core/util';
import Axis from '../Axis';

/**
 * Extend axis 2d
 * @constructor module:echarts/coord/cartesian/Axis2D
 * @extends {module:echarts/coord/cartesian/Axis}
 * @param {string} dim
 * @param {*} scale
 * @param {Array.<number>} coordExtent
 * @param {string} axisType
 * @param {string} position
 */
var Axis2D = function (dim, scale, coordExtent, axisType, position) {
    Axis.call(this, dim, scale, coordExtent);
    /**
     * Axis type
     *  - 'category'
     *  - 'value'
     *  - 'time'
     *  - 'log'
     * @type {string}
     */
    this.type = axisType || 'value';

    /**
     * Axis position
     *  - 'top'
     *  - 'bottom'
     *  - 'left'
     *  - 'right'
     */
    this.position = position || 'bottom';
};

Axis2D.prototype = {

    constructor: Axis2D,

    /**
     * Index of axis, can be used as key
     */
    index: 0,

    /**
     * Implemented in <module:echarts/coord/cartesian/Grid>.
     * @return {Array.<module:echarts/coord/cartesian/Axis2D>}
     *         If not on zero of other axis, return null/undefined.
     *         If no axes, return an empty array.
     */
    getAxesOnZeroOf: null,

    /**
     * Axis model
     * @param {module:echarts/coord/cartesian/AxisModel}
     */
    model: null,

    isHorizontal: function () {
        var position = this.position;
        return position === 'top' || position === 'bottom';
    },

    /**
     * Each item cooresponds to this.getExtent(), which
     * means globalExtent[0] may greater than globalExtent[1],
     * unless `asc` is input.
     *
     * @param {boolean} [asc]
     * @return {Array.<number>}
     */
    getGlobalExtent: function (asc) {
        var ret = this.getExtent();
        ret[0] = this.toGlobalCoord(ret[0]);
        ret[1] = this.toGlobalCoord(ret[1]);
        asc && ret[0] > ret[1] && ret.reverse();
        return ret;
    },

    getOtherAxis: function () {
        this.grid.getOtherAxis();
    },

    /**
     * @override
     */
    pointToData: function (point, clamp) {
        return this.coordToData(this.toLocalCoord(point[this.dim === 'x' ? 0 : 1]), clamp);
    },

    /**
     * Transform global coord to local coord,
     * i.e. var localCoord = axis.toLocalCoord(80);
     * designate by module:echarts/coord/cartesian/Grid.
     * @type {Function}
     */
    toLocalCoord: null,

    /**
     * Transform global coord to local coord,
     * i.e. var globalCoord = axis.toLocalCoord(40);
     * designate by module:echarts/coord/cartesian/Grid.
     * @type {Function}
     */
    toGlobalCoord: null

};

zrUtil.inherits(Axis2D, Axis);

export default Axis2D;