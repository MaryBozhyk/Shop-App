import { CartService } from './cart.service';

const mockData = {
  item: {
    id: '1',
    photo: null,
    name: 'item1',
    price: 100,
    size: 36,
    quantity: 1
  }
};

const mockData2 = {
  item: {
    id: '2',
    photo: null,
    name: 'item2',
    price: 110,
    size: 37,
    quantity: 1
  }
};

describe('CartService creation', () => {
  let service: CartService;

  beforeEach(async () => {
    service = new CartService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('the cart must be empty', () => {
    expect(service.getCartList()).toEqual([]);
  });

  it('should add items to cart', () => {
    service.addItemtoCart(mockData);
    expect(service.totalSumm).toEqual(mockData.item.price);
    expect(service.totalQuantity).toEqual(1, 'item1 is added');
  });

  it('should increase item quantity', () => {
    service.addItemtoCart(mockData);
    service.addItemtoCart(mockData);
    expect(service.totalQuantity).toEqual(2, 'item1 is added');
    expect(service.getCartList().length).toEqual(1);
  });

  it('should increase item quantity', () => {
    service.addItemtoCart(mockData);
    service.increaseItemQty(service.getCartList()[0]);
    expect(service.totalQuantity).toEqual(2, 'item1 is added');
    expect(service.getCartList().length).toEqual(1);
  });

  it('should reduce item quantity', () => {
    service.addItemtoCart(mockData);
    service.addItemtoCart(mockData);
    service.reduceItemQty(service.getCartList()[0]);
    expect(service.totalQuantity).toEqual(1, 'item1 is deleted');
    expect(service.getCartList().length).toEqual(1);
  });

  it('should remove item', () => {
    service.addItemtoCart(mockData);
    service.addItemtoCart(mockData2);
    expect(service.totalQuantity).toEqual(2, 'items are added');
    service.removeItem(service.getCartList()[0]);
    expect(service.totalQuantity).toEqual(1, 'item is deleted');
    expect(service.totalSumm).toEqual(mockData2.item.price, 'remaining item price is correct');
  });

  it('should remove all items', () => {
    service.addItemtoCart(mockData);
    service.removeAllProducts();
    expect(service.getCartList()).toEqual([]);
  });
});
