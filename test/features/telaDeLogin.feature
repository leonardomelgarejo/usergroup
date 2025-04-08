Feature: Tela de Login

  @ui @login @sucesso
  Scenario: 01-Login com sucesso
     Given que o usuário está na tela de login
      When preenche o usuário correto
       And preenche a senha correta
       And clica no botão login
      Then a página inicial é acessada
  
  @ui @login @sem-sucesso @usuario-incorreto
  Scenario: 02-Login sem sucesso - Nome de usuário incorreto
     Given que o usuário está na tela de login
      When preenche o usuário incorreto
       And preenche a senha correta
       And clica no botão login
      Then uma mensagem de erro é apresentada

  @ui @login @sem-sucesso @senha-incorreta
  Scenario: 03-Login sem sucesso - Senha errada
     Given que o usuário está na tela de login
      When preenche o usuário correto
       And preenche a senha incorreta
       And clica no botão login
      Then uma mensagem de erro é apresentada