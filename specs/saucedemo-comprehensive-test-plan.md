# SauceDemo Comprehensive Functional Test Plan

## Application Overview

Manual, browser-observable coverage plan for SauceDemo at https://www.saucedemo.com/. Every scenario starts from a fresh browser context or a clean logged-out session, uses the stated test data, and is independent. The plan covers authentication personas, inventory and product behavior, cart and checkout, navigation/state controls, error handling, accessibility-oriented checks, responsive layout, and session assumptions. Seed file: tests/seed.spec.ts.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with each supported user persona

**File:** `tests/auth/login-personas.spec.ts`

**Steps:**
  1. Start from a fresh browser context at https://www.saucedemo.com/ with no saved cookies or local storage.
    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
    - expect: The page lists standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, and visual_user, and states that the shared password is secret_sauce.
  2. Submit standard_user with password secret_sauce.
    - expect: The user reaches /inventory.html.
    - expect: The Products heading, six-product inventory, sort control, menu control, and cart control are visible.
  3. Repeat from a fresh context with problem_user, performance_glitch_user, error_user, and visual_user, using secret_sauce.
    - expect: Each non-locked persona reaches the inventory page.
    - expect: The inventory remains usable enough to observe its persona-specific behavior; record broken images, incorrect links, delayed responses, changed prices, or other differences rather than treating them as test setup failures.
  4. From a fresh context, submit locked_out_user with secret_sauce.
    - expect: The user remains on the login page.
    - expect: An error message states that this user has been locked out.
    - expect: No inventory or authenticated navigation is exposed.
  5. For every persona, record the URL, visible error or inventory result, response delay, product names/prices, image rendering, product links, add-to-cart behavior, and checkout behavior where applicable.
    - expect: The observed behavior is attributable to the documented persona and is consistent across a repeat attempt, or the deviation is recorded as a defect.

#### 1.2. Login validation and invalid credentials

**File:** `tests/auth/login-validation.spec.ts`

**Steps:**
  1. Start from a fresh logged-out login page and submit with both fields empty.
    - expect: The user remains on the login page.
    - expect: The error says Username is required and the form remains available.
  2. Reload the fresh login page, enter standard_user, leave Password empty, and submit.
    - expect: The user remains on the login page.
    - expect: The error says Password is required.
  3. Reload the fresh login page, leave Username empty, enter secret_sauce, and submit.
    - expect: The user remains on the login page.
    - expect: The error says Username is required.
  4. Reload the fresh login page, enter not_a_user and wrong, and submit.
    - expect: The user remains on the login page.
    - expect: The error says the username and password do not match any user in the service.
  5. Use keyboard navigation to focus Username, Password, and Login, then submit with Enter.
    - expect: Focus order is logical and visible.
    - expect: The same validation or successful-login result occurs as with pointer activation.
  6. Enter valid credentials after an error and submit.
    - expect: The error clears or no longer blocks the flow and the user reaches inventory.

#### 1.3. Logout and authenticated session boundary

**File:** `tests/auth/logout-session.spec.ts`

**Steps:**
  1. Start fresh, log in as standard_user, and open the navigation menu.
    - expect: The menu exposes All Items, About, Logout, Reset App State, and Close Menu.
  2. Select Logout.
    - expect: The user returns to the login page.
    - expect: Authenticated inventory controls are no longer visible.
  3. Use the browser Back action or directly revisit /inventory.html after logout.
    - expect: The application does not grant an unauthenticated user access to the usable inventory session; record whether it redirects to login or exposes stale protected content as a defect.
  4. Log in again as standard_user after logout.
    - expect: A new authenticated session starts cleanly and does not unexpectedly retain the prior cart unless that retention is an explicitly observed product behavior.

### 2. Inventory and products

**Seed:** `tests/seed.spec.ts`

#### 2.1. Inventory listing and product detail navigation

**File:** `tests/inventory/listing-and-details.spec.ts`

**Steps:**
  1. Start fresh and log in as standard_user.
    - expect: The inventory page shows six products: Sauce Labs Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, and Test.allTheThings() T-Shirt (Red).
    - expect: Each product has a name, description, price, image, and Add to cart control.
  2. Select the name and image links for at least the Backpack and one other product.
    - expect: Each selection opens the matching inventory-item detail page.
    - expect: The detail page shows the matching image, name, description, price, add/remove control, and Back to products control.
  3. Add the product from the detail page, then select Back to products.
    - expect: The detail control changes to Remove and the cart badge increments to 1.
    - expect: Inventory shows the selected item in its added state and the cart state is retained after returning.
  4. Open a product detail page from inventory while another item is already in the cart, then return without adding the detail item.
    - expect: The existing cart item remains unchanged and the unselected detail item is not added.

#### 2.2. Inventory sorting options and price integrity

**File:** `tests/inventory/sorting.spec.ts`

**Steps:**
  1. Start fresh as standard_user and record the six displayed names and prices in the default Name (A to Z) order.
    - expect: The default selection is Name (A to Z) and names are alphabetically ordered.
  2. Select Name (Z to A).
    - expect: The six products reverse into descending alphabetical order and each product retains its own name, description, image, and price.
  3. Select Price (low to high), then Price (high to low).
    - expect: Products are ordered numerically by displayed price in ascending and descending order respectively.
    - expect: No product disappears, duplicates, or changes identity during sorting.
  4. Repeat the sort checks for visual_user and record the displayed prices before and after each sort.
    - expect: Sorting remains functional and any visual-user price differences are consistently rendered and are not accidentally mixed with standard-user expected data.

#### 2.3. Add and remove products from inventory

**File:** `tests/inventory/add-remove.spec.ts`

**Steps:**
  1. Start fresh as standard_user and add the Backpack from inventory.
    - expect: The button changes to Remove and the cart badge shows 1.
  2. Add a second distinct product.
    - expect: The second button changes to Remove and the cart badge shows 2.
  3. Remove the first product from inventory.
    - expect: Its control changes back to Add to cart, the cart badge decrements to 1, and the second product remains selected.
  4. Remove the remaining product.
    - expect: The cart badge is absent or shows an empty-cart state and no product remains selected.
  5. Add the same product again after removing it.
    - expect: It can be added once and does not create an unexpected duplicate from a single click.

### 3. Cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Cart contents, quantity behavior, and product navigation

**File:** `tests/cart/cart-contents.spec.ts`

**Steps:**
  1. Start fresh as standard_user, add the Backpack and Bike Light, and open the cart.
    - expect: The cart page shows Your Cart, both selected products, quantity 1 for each, product descriptions, and the cart badge 2.
  2. Select a product name in the cart.
    - expect: The matching inventory-item detail page opens and identifies the same product.
  3. Return to the cart and inspect quantity controls for each line item.
    - expect: Each item has the observable quantity behavior supported by the application; a single add from inventory does not silently produce a quantity greater than 1.
    - expect: Any absent quantity editor is recorded as a product limitation rather than assumed to exist.
  4. Use the cart or product controls to remove one item, then return to the cart.
    - expect: Only the chosen item is removed and the remaining line item, badge, and totals are correct.
  5. From the cart select Continue Shopping.
    - expect: The user returns to inventory and cart contents remain unchanged.

#### 3.2. Empty cart and cart boundary handling

**File:** `tests/cart/empty-cart.spec.ts`

**Steps:**
  1. Start fresh, log in, and open the cart without adding products.
    - expect: The cart page loads with no product line items and no stale items from another session.
    - expect: Continue Shopping is available; Checkout is either disabled, absent, or produces a clear empty-cart response.
  2. If Checkout is available, select it.
    - expect: The application does not complete an order with no items and gives a clear, recoverable response or prevents the action.
  3. Navigate directly to the cart after logging out and back in.
    - expect: The cart starts according to the documented session/reset behavior and does not leak another user’s cart.

### 4. Checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Checkout information validation

**File:** `tests/checkout/information-validation.spec.ts`

**Steps:**
  1. Start fresh as standard_user, add the Backpack, open the cart, and select Checkout.
    - expect: The Checkout: Your Information page shows First Name, Last Name, Zip/Postal Code, Cancel, and Continue.
  2. Submit with all three fields empty.
    - expect: The user stays on step one and sees a clear First Name is required error.
  3. Reload or reset the step, enter Ada as First Name, leave Last Name and Zip/Postal Code empty, and submit.
    - expect: The user stays on step one and identifies the missing Last Name field.
  4. Enter Ada and Lovelace, leave Zip/Postal Code empty, and submit.
    - expect: The user stays on step one and identifies the missing Zip/Postal Code field.
  5. Enter Ada, Lovelace, and 12345, then continue.
    - expect: The user advances to Checkout: Overview and the entered information is accepted.
  6. Repeat with boundary-like data: single-character names, a long name, alphabetic postal text, numeric postal text, and leading/trailing spaces.
    - expect: The application either accepts documented valid formats consistently or shows a clear validation error without losing already entered valid data.

#### 4.2. Checkout overview totals and cancel/back navigation

**File:** `tests/checkout/overview-navigation.spec.ts`

**Steps:**
  1. Start fresh as standard_user, add the Backpack and Bike Light, enter Ada, Lovelace, and 12345, and continue to overview.
    - expect: The overview lists exactly the selected products and quantities.
    - expect: Payment information, shipping information, item total, tax, and total are visible.
    - expect: The total equals item total plus displayed tax, with currency formatting consistent across values.
  2. Select Cancel on the information step.
    - expect: The user returns to the cart or prior shopping context without placing an order and cart contents remain available.
  3. Repeat checkout and select Cancel on the overview step.
    - expect: The user returns to the cart/inventory context without placing an order and no completion confirmation appears.
  4. Use browser Back and Forward across checkout steps.
    - expect: Navigation does not silently duplicate items or bypass required information; the user can recover without a false order completion.

#### 4.3. Successful order completion and post-order actions

**File:** `tests/checkout/order-completion.spec.ts`

**Steps:**
  1. Start fresh as standard_user, add the Backpack, complete checkout with Ada, Lovelace, and 12345, and select Finish.
    - expect: The user reaches Checkout: Complete!.
    - expect: Thank you for your order! and the dispatch message are visible.
    - expect: The Pony Express image is present, and Back Home and Generate PDF order controls are available.
  2. Select Back Home.
    - expect: The user returns to the inventory/products page.
    - expect: The completed order is not presented as an active checkout.
  3. Repeat a successful checkout and select Generate PDF order.
    - expect: A PDF download or browser-visible PDF is initiated with order information, or a clear application error is surfaced; the control must not silently do nothing.
  4. After completion, inspect the cart and start a new shopping flow.
    - expect: The previous order cannot be accidentally submitted twice by refreshing the completion page, and the new flow begins with predictable cart state.

### 5. Navigation, state, accessibility, and layout

**Seed:** `tests/seed.spec.ts`

#### 5.1. Menu links, reset app state, and external destinations

**File:** `tests/navigation/menu-and-reset.spec.ts`

**Steps:**
  1. Start fresh as standard_user, add two products, open the menu, and select Reset App State.
    - expect: The menu closes or returns to the current page.
    - expect: Cart badge and selected product states are cleared.
    - expect: Refreshing or revisiting inventory does not restore the reset cart state.
  2. Open the menu and select All Items from a product detail, cart, and checkout page.
    - expect: Each selection navigates to inventory and shows the products list without corrupting the session.
  3. Open the menu and select About.
    - expect: The browser navigates to the Sauce Labs destination at https://saucelabs.com/ or a clearly configured equivalent.
  4. Open and close the menu repeatedly, including with Close Menu and Escape if supported.
    - expect: The drawer opens and closes reliably, focus does not become trapped outside an open drawer, and no duplicate menu entries appear.
  5. Inspect footer Twitter, Facebook, and LinkedIn links.
    - expect: Each link has a valid external destination and is distinguishable by accessible link text.

#### 5.2. Accessibility-oriented observable checks

**File:** `tests/accessibility/observable-a11y.spec.ts`

**Steps:**
  1. Start fresh and inspect login, inventory, product detail, cart, checkout, and completion pages using keyboard only.
    - expect: All actionable controls are reachable in a logical order, have visible focus, and can be activated without a mouse.
  2. Inspect page headings, form labels, buttons, links, error messages, and select controls with an accessibility tree or screen reader-oriented inspection.
    - expect: Pages expose meaningful names such as Username, Password, Products, Your Cart, Checkout: Your Information, Continue, Finish, and Back Home.
    - expect: Validation errors are associated with the relevant form context and are announced or otherwise discoverable.
  3. Inspect all product and functional images on inventory, detail, and completion pages.
    - expect: Product images have meaningful alternative text, menu icons have usable names, and the Pony Express image is not an unexplained unlabeled control.
  4. Open and close the navigation drawer with keyboard and inspect focus after closing.
    - expect: Focus moves into the opened drawer in a predictable way and returns to a sensible trigger or page location after closing.
  5. Check text contrast, visible focus indicators, error visibility, and control hit areas at normal browser zoom.
    - expect: Text and controls remain readable and distinguishable, errors are not conveyed by color alone, and no actionable element is visually clipped.

#### 5.3. Responsive and basic layout behavior

**File:** `tests/layout/responsive-basics.spec.ts`

**Steps:**
  1. Start fresh at a desktop viewport around 1280x720 and inspect login, inventory, cart, checkout, and completion pages.
    - expect: Primary content, product cards, sort control, cart, footer, and buttons fit within the viewport or scroll predictably without overlap.
  2. Repeat at a narrow mobile viewport around 375x667 and a tablet viewport around 768x1024.
    - expect: The login form remains usable, inventory content reflows without horizontal clipping, the menu and cart remain reachable, and checkout fields/buttons remain visible and usable.
  3. At each viewport, open the menu, add an item, navigate through checkout, and inspect error messages.
    - expect: Open drawers, cart badges, validation text, and buttons do not overlap or resize unpredictably; content remains readable when state changes.
  4. Rotate or resize between desktop and mobile while an item is in the cart.
    - expect: Cart state persists through resize and the layout recovers without duplicated or missing controls.

#### 5.4. Error handling and state isolation

**File:** `tests/resilience/state-isolation.spec.ts`

**Steps:**
  1. Start fresh and attempt direct navigation to inventory, product detail, cart, checkout step one, checkout overview, and completion URLs without logging in.
    - expect: Protected or stateful pages redirect to login or provide a clear recoverable response rather than exposing another session’s data.
  2. Log in as standard_user, add an item, then open a second fresh browser context and log in as standard_user or visual_user.
    - expect: The second context does not unexpectedly inherit the first context’s cart, checkout fields, or completion state.
  3. Refresh inventory, detail, cart, checkout, and completion pages at each stage of a valid flow.
    - expect: Refresh does not duplicate cart items, submit an order, or produce an unhandled blank/error page.
  4. Use invalid product URLs/IDs and malformed or missing query parameters where the application permits direct navigation.
    - expect: The application shows a controlled error, redirects, or a usable fallback; it does not expose stack traces or become unusable.
  5. Repeat a core inventory and checkout smoke path for problem_user, performance_glitch_user, error_user, and visual_user.
    - expect: Record intentional persona defects such as delayed loading, broken/incorrect product behavior, altered prices, or visual differences; all failures are reproducible and do not invalidate standard_user baseline results.
