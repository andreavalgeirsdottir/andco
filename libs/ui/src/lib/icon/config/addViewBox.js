// eslint-disable

exports.type = 'perItem';

exports.active = true;

exports.description =
	'replaces width, height attributes of an svg with viewBox attribute to make it responsive';

const viewBoxElems = ['svg'];

/**
 * Replaces width, height attributes of an svg with viewBox attribute to make it responsive.
 *
 * @see http://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute
 *
 * @example
 * <svg width="100" height="50">
 *             ⬇
 * <svg viewBox="0 0 100 50">
 *
 * Requirment: add "- addViewBox" in svgo.yml file which is placed in the folder where svgo is installed.
 * Usage: svgo --disable=removeViewBox --enable=addViewBox file.svg
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Guy Lando
 */
exports.fn = function(item) {
	if (
		item.isElem(viewBoxElems) &&
		!item.hasAttr('viewBox') &&
		item.hasAttr('width') &&
		item.hasAttr('height')
	) {
		const width = parseFloat(item.attr('width').value.replace(/px$/, ''));
		const height = parseFloat(item.attr('height').value.replace(/px$/, ''));
		item.removeAttr('width');
		item.removeAttr('height');
		item.addAttr({
			name: 'viewBox',
			prefix: '',
			local: 'viewBox',
			value: `0 0 ${width} ${height}`,
		});
	}

	// If there's already a viewBox, then just remove height and width attributes
	if (
		item.isElem(viewBoxElems) &&
		item.hasAttr('viewBox') &&
		item.hasAttr('width') &&
		item.hasAttr('height')
	) {
		item.removeAttr('width');
		item.removeAttr('height');
	}
};
