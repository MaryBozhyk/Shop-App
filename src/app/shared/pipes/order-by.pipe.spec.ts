import { CartItem } from '..';
import { OrderByPipe } from './order-by.pipe';

const testItems: CartItem[] = [
  {
    id: '1',
    photo: null,
    name: 'item1',
    price: 100,
    size: 36,
    quantity: 2
  }, {
    id: '2',
    photo: null,
    name: 'item',
    price: 110,
    size: 38,
    quantity: 3
  }, {
    id: '3',
    photo: null,
    name: '10 item',
    price: 80,
    size: 40,
    quantity: 1
  }
];

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('test sorting by name increase order', () => {
    const result = pipe.transform(testItems, 'name', true);
    expect(result).toEqual(
      [
        {
          id: '3',
          photo: null,
          name: '10 item',
          price: 80,
          size: 40,
          quantity: 1
        }, {
          id: '2',
          photo: null,
          name: 'item',
          price: 110,
          size: 38,
          quantity: 3
        }, {
          id: '1',
          photo: null,
          name: 'item1',
          price: 100,
          size: 36,
          quantity: 2
        }
      ]
    );
  });

  it('test sorting by name decrease order', () => {
    const result = pipe.transform(testItems, 'name');
    expect(result).toEqual(
      [
        {
          id: '1',
          photo: null,
          name: 'item1',
          price: 100,
          size: 36,
          quantity: 2
        }, {
          id: '2',
          photo: null,
          name: 'item',
          price: 110,
          size: 38,
          quantity: 3
        }, {
          id: '3',
          photo: null,
          name: '10 item',
          price: 80,
          size: 40,
          quantity: 1
        }
      ]
    );
  });

  it('test sorting by price increase order', () => {
    const result = pipe.transform(testItems, 'price', true);
    expect(result).toEqual(
      [
        {
          id: '3',
          photo: null,
          name: '10 item',
          price: 80,
          size: 40,
          quantity: 1
        }, {
          id: '1',
          photo: null,
          name: 'item1',
          price: 100,
          size: 36,
          quantity: 2
        }, {
          id: '2',
          photo: null,
          name: 'item',
          price: 110,
          size: 38,
          quantity: 3
        }
      ]
    );
  });

  it('test sorting by price decrease order', () => {
    const result = pipe.transform(testItems, 'price');
    expect(result).toEqual(
      [
        {
          id: '2',
          photo: null,
          name: 'item',
          price: 110,
          size: 38,
          quantity: 3
        }, {
          id: '1',
          photo: null,
          name: 'item1',
          price: 100,
          size: 36,
          quantity: 2
        }, {
          id: '3',
          photo: null,
          name: '10 item',
          price: 80,
          size: 40,
          quantity: 1
        }
      ]
    );
  });

  it('test sorting by quantity decrease order', () => {
    const result = pipe.transform(testItems, 'quantity', true);
    expect(result).toEqual(
      [
        {
          id: '3',
          photo: null,
          name: '10 item',
          price: 80,
          size: 40,
          quantity: 1
        }, {
          id: '1',
          photo: null,
          name: 'item1',
          price: 100,
          size: 36,
          quantity: 2
        }, {
          id: '2',
          photo: null,
          name: 'item',
          price: 110,
          size: 38,
          quantity: 3
        }
      ]
    );
  });

  it('test sorting by quantity decrease order', () => {
    const result = pipe.transform(testItems, 'quantity');
    expect(result).toEqual(
      [
        {
          id: '2',
          photo: null,
          name: 'item',
          price: 110,
          size: 38,
          quantity: 3
        }, {
          id: '1',
          photo: null,
          name: 'item1',
          price: 100,
          size: 36,
          quantity: 2
        }, {
          id: '3',
          photo: null,
          name: '10 item',
          price: 80,
          size: 40,
          quantity: 1
        }
      ]
    );
  });
});

