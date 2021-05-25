//creating a new components for product, this is just for practise purpose
//  Vue.component('product-details',{
//      props: {
//          details: {
//              type:Array,
//              required:true
//          }
//      },
//      template : `
//               <ul>
//               <li v:for="detail in details"> {{ detail}} </li>
//               </ul> `
//  })


//registering the components
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div> 
            <div class="product">

                <div class="product-img">
                    <img :src="image" style="width:300px;height:300px;">
                </div>

                <div class="link">
                    <a :href="link" target="_blank">View product like this</a>
                </div>
            </div>

            <h1> {{title}} </h1>
            <p v-if="inStock"> In Stock</p>
            <p v-else class="notInStock"> Out of Stock </p>
            <p>Shipping : {{ shipping }}</p>
            
<!--            Add an onSale property to the product’s data that is used to conditionally render a span that says “On Sale!”&ndash;&gt;-->
            <span class="alert alert-danger p-0" > {{inSale}} </span>


            <ul>
                <li v-for="detail in details">{{detail}}</li>
<!--                 we are viewing each li elements in each row so we are using detail as in expression by calling the details data-->
            </ul>

            <div v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 class="color-box"
                 :style="{ backgroundColor : variant.variantColor }"
                 @mouseover="updateProduct(index)">
            </div>

<!--            Add an array of sizes to the data and use v-for to display them in a list.-->
            <ul>
                <li v-for="size in sizes">{{size}}</li>
            </ul>

            <p>{{description}}</p>

            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>

<!--             Create a new button and method to decrement the value of cart.-->
            <button :disabled="cart === 0" @click="removeFromCart">Remove from Cart</button>
            
            <div>
            <h2>Reviews</h2>
            <p v:if="!reviews.length">There are no reviews yet</p>
            <ul>
            <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>{{ review.review }}</p>
            <p>{{ review.rating }}</p>
            </li>
            </ul>
            </div>
            <product-review @review-submitted="addReview"></product-review>
            
       </div>
        </div> `,

    data() {
        return {
            brand: "Vue New",
            product: 'Shoes', //do not forgot to insert comma
            selectedVariant: 0,
            link: 'https://www.nike.com/t/free-rn-2018-mens-running-shoe-4VTnGqeZ/942836-100?nikemt=true&cp=96413943330_search_%7cPRODUCT_GROUP%7cGOOGLE%7c71700000041489782%7cAll_X_X_X_X-Device_X_Nike-Clearance_X%7c%7cc&gclid=Cj0KCQjws-OEBhCkARIsAPhOkIZ_YCm0K79WV1LhPgaut2uSvYCku4MsnhdrQexGT4G7SFt485ohBfIaAh4fEALw_wcB&gclsrc=aw.ds',
            onSale: true,
            details: ["upper material has spandex", "wide strap wraps your heel for added support", "Textured toe and heel foam sole sections for traction"],
            variants: [
                {
                    variantId: 1234,
                    variantColor: "black",
                    variantImage: "https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200",
                    variantQuantity: 100
                },
                {
                    variantId: 1235,
                    variantColor: "red",
                    variantImage: "https://images.pexels.com/photos/2226673/pexels-photo-2226673.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=200",
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            description: 'Achilles tendon protector.',
            reviews:[]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.$emit('remove-from-cart',this.variants[this.selectedVariant].variantId)
        },
        addReview(productReview) {
            this.reviews.push(productReview)


        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        inSale() {
            if (this.onSale) {
                return "Hurry up!! " + this.brand + " " + this.product + " is in sale!!";
            } else {
                return this.brand + " " + this.product + " Not in sale!!";
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return 2.99
        }
    }
})


Vue.component('product-review', {
    template : `
    <form class ="review-form" @submit.prevent="onSubmit">
  <p>
  <label for="name">Name:</label>
  <input type="text" id="name" v-model="name" required>
  </p>
  <p>
  <label for="review">Review:</label>
  <input type="text" id="review" v-model="review" required>
  </p>
  <p>
  <label for="rating">Rating:</label>
  <select id="rating" v-model.number="rating" required>
  <option>5</option>
  <option>4</option>
  <option>3</option>
  <option>2</option>
  <option>1</option>
 </select>
</p>

  <p>
  <input type="submit" value="Submit">
  </p>
</form>
    `,
    data(){
        return {
            name : null,
            review : null,
            rating : null
        }
    },
    methods: {
        onSubmit() {
            let productReview = {
                name:this.name,
                review:this.review,
                rating:this.rating
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        }
    }
})

//creating vue instance for products
var app = new Vue({
    el: '#app', //we are using el as a plugin for id = app from html
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeItem(id) {
            for(let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})