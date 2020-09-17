import { fromJS } from 'immutable';
import { mergeDeepOverwriteLists } from '../../../js/state/entities/entitiesMerger';

describe('Entities merge', () => {
  it('should merge object', () => {
    const a = { uuid: '123', display: 'test' };
    const b = { uuid: '123', name: 'tester' };
    const expected = { uuid: '123', name: 'tester', display: 'test' };

    const merged = mergeDeepOverwriteLists(fromJS(a), fromJS(b));
    expect(merged.toJS()).toEqual(expected);
  });

  it('can overwrite object', () => {
    const a = { uuid: '123', display: 'test' };

    const merged = mergeDeepOverwriteLists(fromJS(a), null);
    expect(merged).toEqual(null);
  });

  it('should override list', () => {
    const a = {
      uuid: '123',
      display: 'test',
      patient: { uuid: 'xyz', display: 'test' },
      obs: ['123', '124'],
    };
    const b = {
      uuid: '123',
      name: 'tester',
      patient: { uuid: 'xyz', display: 'test' },
      obs: ['125', '126'],
    };
    const expected = {
      uuid: '123',
      name: 'tester',
      patient: { uuid: 'xyz', display: 'test' },
      display: 'test',
      obs: ['125', '126'],
    };

    const merged = mergeDeepOverwriteLists(fromJS(a), fromJS(b));
    expect(merged.toJS()).toEqual(expected);
  });

  it('should merge object and overwrite list', () => {
    const a = { uuid: '123', display: 'test1', obs: ['123', '124'] };
    const b = { uuid: '124', name: 'tester1', obs: ['125', '126'] };
    const c = { uuid: '125', display: 'test2', obs: ['123', '124'] };
    const d = { uuid: '126', name: 'tester2', obs: ['125', '126'] };
    const l1 = [a, b];
    const l2 = [c, d];
    const expected = [
      {
        uuid: '125',
        display: 'test2',
        obs: ['123', '124'],
      },
      {
        uuid: '126',
        name: 'tester2',
        obs: ['125', '126'],
      },
    ];

    const merged = mergeDeepOverwriteLists(fromJS(l1), fromJS(l2));
    expect(merged.toJS()).toEqual(expected);
  });
});
