### **Classes do Sistema**

1. **User**  
   Representa um usuário do sistema, que pode ser um cliente ou administrador.  
   ```typescript
   class User {
       id: string;
       name: string;
       email: string;
       password: string;
       role: 'admin' | 'customer' | 'vendor';
       isActive: boolean;
       createdAt: Date;
       updatedAt: Date;
       phoneNumber?: string;
       address?: Address[];
       wishlist?: string[]; // Lista de IDs de produtos
       cart?: Cart;
   }
   ```

2. **Address**  
   Modela os endereços dos usuários ou da loja.  
   ```typescript
   class Address {
       id: string;
       userId: string;
       street: string;
       city: string;
       state: string;
       country: string;
       postalCode: string;
       isDefault: boolean;
   }
   ```

3. **Category**  
   Categorias para organização de produtos.  
   ```typescript
   class Category {
       id: string;
       name: string;
       slug: string;
       description?: string;
       parentCategoryId?: string; // ID da categoria pai
       createdAt: Date;
       updatedAt: Date;
   }
   ```

4. **Product**  
   Representa os produtos da loja.  
   ```typescript
   class Product {
       id: string;
       name: string;
       description: string;
       slug: string;
       sku: string;
       price: number;
       discountPrice?: number;
       stock: number;
       images: string[];
       categories: string[]; // IDs das categorias
       attributes: ProductAttribute[];
       isActive: boolean;
       createdAt: Date;
       updatedAt: Date;
   }
   ```

5. **ProductAttribute**  
   Define os atributos dos produtos (ex.: tamanho, cor).  
   ```typescript
   class ProductAttribute {
       id: string;
       productId: string;
       key: string;
       value: string;
   }
   ```

6. **Order**  
   Modela os pedidos realizados na loja.  
   ```typescript
   class Order {
       id: string;
       userId: string;
       products: OrderProduct[];
       totalAmount: number;
       status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
       paymentStatus: 'pending' | 'paid' | 'failed';
       createdAt: Date;
       updatedAt: Date;
       shippingAddress: Address;
       billingAddress?: Address;
   }
   ```

7. **OrderProduct**  
   Relaciona produtos aos pedidos.  
   ```typescript
   class OrderProduct {
       id: string;
       orderId: string;
       productId: string;
       quantity: number;
       price: number;
   }
   ```

8. **Cart**  
   Carrinho de compras.  
   ```typescript
   class Cart {
       id: string;
       userId: string;
       items: CartItem[];
       createdAt: Date;
       updatedAt: Date;
   }
   ```

9. **CartItem**  
   Itens do carrinho.  
   ```typescript
   class CartItem {
       id: string;
       cartId: string;
       productId: string;
       quantity: number;
       price: number;
   }
   ```

10. **Payment**  
    Informações de pagamento.  
    ```typescript
    class Payment {
        id: string;
        orderId: string;
        amount: number;
        method: 'credit_card' | 'paypal' | 'bank_transfer';
        status: 'pending' | 'completed' | 'failed';
        createdAt: Date;
        updatedAt: Date;
    }
    ```

11. **Discount**  
    Modela cupons de desconto.  
    ```typescript
    class Discount {
        id: string;
        code: string;
        description?: string;
        percentage?: number;
        fixedAmount?: number;
        expirationDate: Date;
        isActive: boolean;
    }
    ```

12. **Vendor**  
    Representa os vendedores no sistema.  
    ```typescript
    class Vendor {
        id: string;
        name: string;
        email: string;
        phone: string;
        address: Address;
        products: string[]; // IDs dos produtos
        createdAt: Date;
        updatedAt: Date;
    }
    ```

13. **Review**  
    Avaliações dos produtos.  
    ```typescript
    class Review {
        id: string;
        productId: string;
        userId: string;
        rating: number; // De 1 a 5
        comment: string;
        createdAt: Date;
    }
    ```

14. **Inventory**  
    Gerenciamento de estoque.  
    ```typescript
    class Inventory {
        id: string;
        productId: string;
        stock: number;
        restockDate?: Date;
        createdAt: Date;
        updatedAt: Date;
    }
    ```

15. **Shipping**  
    Informações de envio.  
    ```typescript
    class Shipping {
        id: string;
        orderId: string;
        provider: string;
        trackingNumber: string;
        status: 'pending' | 'shipped' | 'in_transit' | 'delivered';
        estimatedDeliveryDate: Date;
    }
    ```

16. **Tax**  
    Taxas aplicáveis.  
    ```typescript
    class Tax {
        id: string;
        name: string;
        rate: number; // Percentual
        description?: string;
    }
    ```

17. **Notification**  
    Notificações no sistema.  
    ```typescript
    class Notification {
        id: string;
        userId: string;
        message: string;
        isRead: boolean;
        createdAt: Date;
    }
    ```

18. **Subscription**  
    Assinaturas (caso aplicável).  
    ```typescript
    class Subscription {
        id: string;
        userId: string;
        plan: string; // Ex.: Basic, Premium
        status: 'active' | 'canceled';
        startDate: Date;
        endDate?: Date;
    }
    ```

19. **AdminLog**  
    Logs administrativos.  
    ```typescript
    class AdminLog {
        id: string;
        adminId: string;
        action: string;
        targetId?: string; // ID do recurso modificado
        timestamp: Date;
    }
    ```

20. **Settings**  
    Configurações gerais da loja.  
    ```typescript
    class Settings {
        id: string;
        key: string;
        value: string;
    }
    ```

Este é um modelo modular e extensível, pronto para ser usado em projetos reais. Se precisar de um diagrama UML ou refinar algo, é só pedir!
