import _ from "lodash";

export function filterArrDuplicates(arr1, arr2) {
  return _.difference(arr1, arr2);
}

export function sortArrByAscending(arr, iters) {
  return _.sortBy(arr, iters);
}

export function filterByOptions(collection, options) {
  return _.filter(collection, options);
}

export function findFirstMatch(collection, toMatch) {
  return _.find(collection, toMatch);
}

export function removeByMatch(collection, toMatch) {
  return _.remove(collection, toMatch);
}
