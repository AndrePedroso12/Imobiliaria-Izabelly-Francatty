<template>
  <section class="login-page">
    <div class="image-side">
      <img
        src="https://oneluxo.com.br/wp-content/uploads/2022/08/Pininfarina-blog-quarta-1-scaled-e1660151420613.jpg"
        alt=""
      />
    </div>

    <div class="login-content">
      <h1 class="">Imobiliaria Izabelly Francatti</h1>

      <h1 class="">Entre com suas credenciais abaixo</h1>

      <form class="" action="#" method="POST">
        <div>
          <label class="">Email</label>
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter Email Address"
            class=""
            autofocus
            required
          />
        </div>

        <div class="mt-4">
          <label class="">Senha</label>
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter Password"
            minlength="6"
            class=""
            required
          />
        </div>

        <div class="text-right mt-2">
          <a href="#" class="">Esqueceu sua senha?</a>
        </div>

        <button type="submit" class="">Log In</button>
      </form>

      <hr class="" />

      <p class="">&copy; 2024 Izabelly Francatti - All Rights Reserved.</p>
      <p class="">
        Desenvolvolvido por
        <a href="https://andrepedroso.netlify.app" target="_blank" rel="noopener noreferrer">
          &copy; 2024 André Pedroso.</a
        >
      </p>
    </div>
  </section>
</template>

<style lang="scss">
.login-page {
  display: flex;
  flex-wrap: nowrap;
  min-height: 100vh;
}

.image-side {
  width: 60%;
  height: 100vh;

  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.login-content {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  padding: 4rem;
  text-align: left;
  width: 40%;
  justify-content: center;
}

input {
  padding: 0.95rem 1rem;
  border-radius: 0.5rem;
  font-size: 18px;
  width: 100%;
  background-color: #edf2f7;
  margin-top: 0.5rem;
  border: 1px solid #e2e8f0;
  color: black;
}

button {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-top: 1.5rem;
  background-color: #4299e1;
  color: white;
}

form {
  width: 100%;
  margin-top: 1.5rem;
}

label {
  color: #4a5568;
  font-size: 18px;
}

h1 {
  font-size: 1.5rem;
  margin-top: 3rem;
  line-height: 1.25;
  font-weight: 700;
}

p {
  font-size: 0.875rem;
  color: #a0aec0;
  margin-top: 3rem;
}

.text-right.mt-2 {
  margin-top: 10px;
  a {
    font-size: 0.975rem;
    color: #4a5568;
    font-weight: 600;
    text-align: right;
  }
}

.mt-4 {
  margin-top: 1rem;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
