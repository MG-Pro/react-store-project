import React, {Component}  from 'react';

export default class Subscribe extends Component {
  state = {
    emailValid: false,
    subscribeDidSend: false,
  };

  submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const regex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
    if (!regex.test(form.email.value)) {
      this.setState({
        emailValid: true,
      });
      return;
    }
    const sendData = {
      email: form.email.value,
      subscribeType: form.subscribe.value,
    };
    this.setState({
      subscribeDidSend: true,
    });
    console.log(sendData);
  };

  changeEmail = (e) => {
    e.preventDefault();
    this.setState({
      emailValid: false,
    });
  };

  render() {
    return (
      <section className="subscribe">
        <div className="subscribe__wrapper">
          <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
          {!this.state.subscribeDidSend ?
            <form className="subscribe__radios" onSubmit={this.submitHandler} noValidate>
              <label className="subscribe__radio_label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="women"/>
                <div className="subscribe__radio_text">Женское</div>
              </label>
              <label className="subscribe__radio_label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="men"/>
                <div className="subscribe__radio_text">Мужское</div>
              </label>
              <label className="subscribe__radio_label">
                <input className="subscribe__radio" type="radio" name="subscribe" value="both" defaultChecked/>
                <div className="subscribe__radio_text">Всё</div>
              </label>
              <input
                className={`subscribe__email ${!this.state.emailValid ? '' : 'subscribe__email_error'}`}
                type="email"
                placeholder="Ваш e-mail"
                name='email'
                onChange={this.changeEmail}
              />
              <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ"/>
            </form>
            :
            <h2 className="subscribe__title">Подписка оформлена! Спасибо!</h2>
          }


        </div>
      </section>
    );
  }
}
