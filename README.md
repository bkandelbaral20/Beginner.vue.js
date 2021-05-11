# Beginner.vue.js

1. Vue Instance
2. Vue Attribute Binding
   It dynamically binds an attribute into expressions 
    **v-bind:src= {{ expressions }}**
   - Data can be bound to HTML attributes.
   - Syntax is v-bind: or : for short.
   - The attribute name that comes after the : specifies the attribute we’re binding data to.
   - Inside the attribute’s quotes, we reference the data we’re binding to.
3. Conditional Rendering
   There are Vue directives to conditionally render elements:
   v-if
   v-else-if
   v-else
   v-show
   If whatever is inside the directive’s quotes is truthy, the element will display.
   You can use expressions inside the directive’s quotes.
   V-show only toggles visibility, it does not insert or remove the element from the DOM.
4. Classes and Style Binding
   Data can be bound to an element’s style attribute
   Data can be bound to an element’s class
   We can use expressions inside an element’s class binding to evaluate whether a class should appear or not
   You can bind an entire class object or array of classes to an element 
   <div :class="classObject"></div>  
   <div :class="[activeClass, errorClass]"></div>
5. Computed Property
   These are properties on the Vue instance that calculate a value rather than store a value.
   Computed properties can use data from your app to calculate its values.
   it is like using calculator we get computed value 2+3 =5 , so Binjita + Baral = Binjita baral


   