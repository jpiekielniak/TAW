import _ from 'lodash';

function convert(data) {
  if (Array.isArray(data)) {
    return _.map(data, function (elem) {
      return convert(elem);
    });
  }
  data = data.toObject({ getters: true, versionKey: false });
  delete data.id;
  return data;
}

export default convert;
