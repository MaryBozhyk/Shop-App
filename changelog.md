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


Task 2

1. Розбито додаток на окремі модулі: AppModule, CartModule, ProductModule, SharedModule.

2. Створення  ProductListComponent та ProductComponent реалізовано в контексті Task 1.

3. Добавлено можливість додавати товар в корзину лише в тому випадку, якщо одраний розмір. В іншому випадку кнопка 'Buy' неактивна.

4. Модифіковано CartService. Додано методи для збільшення/зменшення/видалення товару з корзини. Також додано до властивостей товарів катри розмір товару.

5. Модифікаовано CartListComponent. Додано методи  getTotalQty, onRemove, onReduce, onIncrease для керування товарами в корзині.

6-7. Створено СartItemComponent. Для комунікації з CartListComponent використано @Input() та @Output.

9. Також з використано lifecycle hook методи ngAfterViewInit(), ngDoCheck(), ngOnInit().

10. Використано ДОМ подію click.

11.  доданов AppComponent елемент <h1 #appTitle></h1>. З використанням @ViewChild додано заголовок.

12. Створено HighlightDirectivе з використанням @HostBinding, @HostListener, яка спрацьовує при ховері на ітем в корзині.

13. Використано директиву ngClass для зміни стилю неактивної кнопки.

14. Створено SizeButtonComponent, який відображає кнопку окремого розміру та комунікує з ProductComponent через @Input() та @Output. Окрім цього реалізовано комунікацію між цими компонентами з застосуванням @ViewChildren. Додано метод onChangeSize, який відслідкову щоб був вибраний лише один розмір, а також дізейблить кнопку 'Buy' у випадку, якщо не обрано жодного розміру.


Task 3

1-6. Створено методи та сервіси сервіси згідно з завданнями, застосовано їх в компоненті AboutComponent, a також в методі життєвого циклу onInit в консоль виведено значення.

7. Директива застосована на блоці about-component__block (блок змінює колір при кліку на нього).


Task 4

1. Застосовано пайпи uppercase(first.component.html, product.component.html для модифікування назви товарів), titlecase(cart-list.component.html для модифікування опцій сортування), currency(cart-list.component.html, cart-item.component.html, first.component.html, product.component.html для відображення ціни), date(app.component.html для відображення дати і часу рефрешення сторінки).

2. Змінено метод getProducts() сервису ProductService(повертає Observable). Застосовано async пайпу в product-list.component.html для відображення списку товарів в корзині.
3-5. Створено OrderByPipe, яка приймає 2 параметри (shared/pipes/order-by.pipe.ts). Зареєстровано її в  SharedModule і експортовано. Застосовано в cart-list.component.html для сортування списку товарів по ціні, кількості, назві а також в зростаючому і спадному порядку.

6. Експортовано із  SharedModule модулі CommonModule, FormsModule та видалено їх з інших модулів.