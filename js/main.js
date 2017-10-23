function showPlansData(plans) {
  // Plan Price Container
  const planPrice = document.querySelector('[data-js="planPrice"]');
  // List of Payments Methods
  const paymentMethodsList = document.querySelector('[data-js="paymentMethodsList"]');
  // Plans Container
  const stepPlans = document.querySelector('[data-js="stepPlans"]');

  // Looping though all plans and insert to HTML
  plans.map(plan =>
    stepPlans.insertAdjacentHTML('beforeend', `
      <label class="step__label ${plan.id === 1 ? 'step__plans--checked' : ''}" data-js="plansRadio">
        <input class="step__input" type="checkbox" value="${plan.name}" ${plan.id === 1 ? 'checked' : ''}>
        <span class="check__icon"></span>
        <span class="step__months">${plan.name}</span>
        <span class="step__discount">${plan.discount}</span>
      </label>
    `)
  );

  // Select all Plans
  const planLabels = Array.from(document.querySelectorAll('[data-js="plansRadio"]'));

  function showPlanPrice(e) {
    // Looping thought plans data too find the clicked item content
    return plans.map((plan) => {
      if (plan.name === e.children[0].value) {
        // Add content to HTML
        planPrice.innerHTML = `
          <div class="step__coin">
            ${plan.price.currency}
          </div>
          <div class="step__price">
            ${plan.price.integer}
          </div>
          <div class="step__cents">
            ${plan.price.decimal}
          </div>
          <div class="step__planType">
            ${plan.price.periodicy}
          </div>
          <div class="step__total">
            ${plan.total}
          </div>
        `;
        paymentMethodsList.innerHTML = `
          <li class="paymentMethods__item">
            <div class="paymentMethods__icon">
              <img src="img/icon-creditCard.svg" alt="">
            </div>
            <span class="paymentMethods__method">${plan.payments[0]}</span>
          </li>
          <li class="paymentMethods__item">
            <div class="paymentMethods__icon">
              <img src="img/icon-debit.svg" alt="">
            </div>
            <span class="paymentMethods__method">${plan.payments[1]}</span>
          </li>
          <li class="paymentMethods__item">
            <div class="paymentMethods__icon">
              <img src="img/icon-boleto.svg" alt="">
            </div>
            <span class="paymentMethods__method">${plan.payments[2]}</span>
          </li>
        `;
      }
      return false;
    });
  }
  function checkPlan() {
    // Looping thought plans to see who's checked and removing class
    planLabels.map((plan) => {
      if (plan.classList.contains('step__plans--checked')) {
        plan.children[0].checked = false;
        plan.classList.remove('step__plans--checked');
      }
      return false;
    });

    // Add checked class to clicked element
    this.children[0].checked = true;
    this.classList.add('step__plans--checked');

    // Calling function to show plan price
    showPlanPrice(this);
  }
  planLabels.map((label) => {
    // Checking what element is already checked
    if (label.classList.contains('step__plans--checked')) {
      showPlanPrice(label);
    }
    label.addEventListener('click', checkPlan);

    return false;
  });
}

// Data Fetch
const plansPromise = fetch('server/data.json');
plansPromise
  .then(data => data.json())
  .then(data => showPlansData(data.plans));
