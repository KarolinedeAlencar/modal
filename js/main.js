// Buttons
const nextBtn = document.querySelector('[data-js="nextBtn"]');
const prevBtn = document.querySelector('[data-js="prevBtn"]');
const finishBtn = document.querySelector('[data-js="finishBtn"]');

// Steps
const firstStep = document.querySelector('[data-js="firstStep"]');
const secondStep = document.querySelector('[data-js="secondStep"]');
const finalStep = document.querySelector('[data-js="finalStep"]');

// Breadcrumbs
const firstBreadcrumb = document.querySelector('[data-js="firstBreadcrumb"]');
const secondBreadcrumb = document.querySelector('[data-js="secondBreadcrumb"]');

// Form inputs
const inputs = Array.from(document.querySelectorAll('.form__field'));
const dateMonth = document.querySelector('[data-js="dateMonth"]');
const dateYear = document.querySelector('[data-js="dateYear"]');
const dateFieldset = document.querySelector('[data-js="dateFieldset"]');


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
              <img src="img/icon-credit.svg" alt="">
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

function checkAllInputs() {
  const isAllOk = inputs.every(input => input.dataset.verified === 'true');

  if (isAllOk) {
    finishBtn.disabled = false;
  } else {
    finishBtn.disabled = true;
  }
}

function showErrorMessage(element) {
  return element.classList.add('invalid__field');
}

function luhnAlgorithim(a, b, c, d, e, ...args) {
  if (args[0] === '') {
    return false;
  }

  for (d = +a[b = a.length - 1], e = 0; b--;) {
    c = +a[b], d += ++e % 2 ? 2 * c % 10 + (c > 4) : c;
  }
  return !(d % 10);
}

function checkDate() {
  const date = new Date();

  return dateMonth.value < date.getMonth() && Number(dateYear.value) <= date.getFullYear();
}

function checkCode() {
  const securityCode = document.querySelector('[data-js="securityCode"]');
  return securityCode.value.length > 4 || securityCode.value.length <= 2;
}

function paymentStep() {
  const cardNumber = document.querySelector('[data-js="cardNumber"]');
  const securityCode = document.querySelector('[data-js="securityCode"]');
  const cardName = document.querySelector('[data-js="cardName"]');

  cardNumber.addEventListener('keyup', function () {
    if (luhnAlgorithim(this.value) === false) {
      showErrorMessage(this);
      this.dataset.verified = 'false';
      checkAllInputs();
    } else {
      this.classList.remove('invalid__field');
      this.dataset.verified = 'true';
      checkAllInputs();
    }
  });

  dateFieldset.addEventListener('change', () => {
    if (checkDate()) {
      dateMonth.classList.add('invalid__field');
      dateYear.classList.add('invalid__field');
      dateMonth.dataset.verified = 'false';
      dateYear.dataset.verified = 'false';
      checkAllInputs();
    } else {
      dateMonth.classList.remove('invalid__field');
      dateYear.classList.remove('invalid__field');
      dateMonth.dataset.verified = 'true';
      dateYear.dataset.verified = 'true';
      checkAllInputs();
    }
    return false;
  });

  securityCode.addEventListener('keyup', function () {
    if (checkCode()) {
      showErrorMessage(this);
      this.dataset.verified = 'false';
      checkAllInputs();
    } else {
      this.classList.remove('invalid__field');
      this.dataset.verified = 'true';
      checkAllInputs();
    }
  });

  cardName.addEventListener('keyup', function () {
    if (this.value === '') {
      showErrorMessage(this);
      this.dataset.verified = 'false';
      checkAllInputs();
    } else {
      this.classList.remove('invalid__field');
      this.dataset.verified = 'true';
      checkAllInputs();
    }
  });
}

function nextStep() {
  const stepLabels = Array.from(document.querySelectorAll('[data-js="plansRadio"]'));
  const choicePlanType = document.querySelector('[data-js="choicePlanType"]');

  stepLabels.map((item) => {
    if (item.children[0].checked) {
      choicePlanType.innerHTML = `${item.children[0].value}`;
    }
    return false;
  });

  firstStep.classList.remove('active');
  secondStep.classList.add('active');

  // Hidding Next Button
  nextBtn.classList.remove('active');
  // Showing Finish Btn
  finishBtn.classList.add('active');
  // Showing Prev Btn
  prevBtn.classList.add('active');
  firstBreadcrumb.classList.remove('breadcrump--active');
  secondBreadcrumb.classList.add('breadcrump--active');

  paymentStep();
}

function prevStep() {
  firstStep.classList.add('active');
  secondStep.classList.remove('active');
  // Hidding Next Button
  nextBtn.classList.add('active');
  // Showing Finish Button
  finishBtn.classList.remove('active');
  prevBtn.classList.remove('active');

  firstBreadcrumb.classList.add('breadcrump--active');
  secondBreadcrumb.classList.remove('breadcrump--active');
}

function showFinalStep() {
  const headerBreadcrumb = document.querySelector('[data-js="headerBreadcrumb"]');
  const footer = document.querySelector('[data-js="footer"]');

  headerBreadcrumb.style.display = 'none';
  footer.style.display = 'none';
  secondStep.classList.remove('active');
  finishBtn.classList.remove('active');
  finalStep.classList.add('active');
  prevBtn.classList.remove('active');
}

// Data Fetch
const plansPromise = fetch('server/data.json');
plansPromise
  .then(data => data.json())
  .then(data => showPlansData(data.plans));

nextBtn.addEventListener('click', nextStep);
prevBtn.addEventListener('click', prevStep);
finishBtn.addEventListener('click', showFinalStep);
