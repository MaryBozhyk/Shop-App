Task 1
4. Створено FirstComponent та додано до нього властивості:
  name: string;
  description: string;
  category: Category;
  isAvailable: boolean;
  sizes: Array<number>;
  color: string;
  photo: string;
photo, name, price, color, sizes, description відображено в темплейті. Також у випадку коли наявний товар (isAvailable = true) відображаються sizes та add-button. В іншому випадку - альтернативний блок з текстом "At the present moment is not available". add-button через @Input() отримує об'єкт айтема. Даний товар застилізовано як бест селлер.

5. В папці shared створено компонент ButtonComponent, який при кліку виводить в консоль 'You have bought item', а також викликає метод addItemtoCart із сервісу cartService (додає до масиву товарів, які знаходяться в карті, поточний товар).
В папці product-list/product створено презентайційний компонент ProductComponent, який через @Input() отримує item і відображає його в темплейті. Також у випадку коли наявний товар (isAvailable = true) відображаються sizes та add-button. В іншому випадку - альтернативний блок з текстом "At the present moment is not available". Також при кліку на Details позується/приховується детальна інформація (застосовано структурну директиру *ngIf та івент баїндінг на click). Також застосовано ChangeDetectionStrategy.OnPush.

6. В папці products-list створено ProductsService, який містить масив products та метод  getProducts(), який їх повертає.
Модель Product описана в файлі shared/product.model.ts. Також в shared/category.enum.ts створений enum Category. Для зручності здійснено їх реекспорт в файлі shared/index.ts.
Створено компонент ProductListComponent, який отримує масив продуктів з ProductsService з використанням dependency injection та відображає ProductComponent використанням структурної директиви *ngFor та @Input(). Також для відслідковування змін по імені застосовано trackBy.

7. Створено CartListComponent, який з застосуванням dependency injection отримує з СartService за допомогою методу getCartList() перелік товарів в карті. Також з використанням lifecycle hook методу ngDoCheck() застососується метод getTotalSumm() для обчистення загальної вартості товарів в карті. Інформацію відображено в темплейті з використанням структунрої директиви *ngFor, інтерполяції, проперті баїндійгу та currency пайпу.
Створено  CartService(core/cart.service), який містить два методи getCartList() для отримання списку товарів в карті та addItemtoCart(item: Product), який перевіряє чи товар знаходиться в масиві basketItems, і якщо так, то збільшує кількість, або ж пушить його в масив. 
Також додано interface CartItem (shared/product.model.ts) для опису вигляду товару, що додається в карту.
В AppComponent з застосуванням dependency injection отримано доступ до CartService(public, бо використовується в темплейті). З використанням структурної директиви *ngIf перевіємо чи наявні товари в масиві basketItems, якщо так то відображаємо CartListComponent, а в іншому випадку альтернативний блок #emptyCart.

