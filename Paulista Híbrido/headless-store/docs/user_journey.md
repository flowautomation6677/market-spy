# Documentação da Experiência do Usuário (UX) - Compra Híbrida

Este documento detalha a jornada do usuário, a experiência projetada e os processos técnicos e operacionais do modelo de "Compra Híbrida" implementado no site **Paulista.store**.

## 1. Visão Geral e Estratégia
O objetivo central é resolver a insegurança técnica do cliente na compra de um assento sanitário. A maioria dos clientes não sabe identificar o modelo correto apenas olhando.
A estratégia **Híbrida** combina:
*   **Autoatendimento Digital (Site/Wizard)**: Para a maioria dos casos onde a identificação visual é simples.
*   **Venda Assistida (WhatsApp)**: Para casos de dúvida, garantindo que a venda não seja perdida por insegurança.

## 2. Passo a Passo da Jornada (Fluxo de Navegação)

A jornada é projetada como um "Funil de Identificação" em 3 etapas simples dentro de um componente interativo (Wizard).

### Etapa 1: Entrada e Identificação Visual
*   **O que o usuário vê:** Uma interface limpa perguntando "Qual o formato do seu vaso?".
*   **Ação:** O usuário seleciona entre 4 opções visuais claras:
    1.  **Oval Tradicional**
    2.  **Quadrado / Retangular**
    3.  **Universal / Padrão**
    4.  **Não tenho certeza** (Botão de segurança)
*   **Experiência:** Uso de ícones e cores distintas para cada formato para facilitar a associação cognitiva rápida.

### Etapa 2: Confirmação (Check-point)
*   **Gatilho:** Seleção de um formato específico (ex: Oval).
*   **O que o usuário vê:** Uma tela de confirmação "Você selecionou: OVAL".
*   **Objetivo UX:** Forçar uma pausa cognitiva para o usuário validar sua própria escolha, reduzindo a taxa de devolução por erro.
*   **Ações:**
    *   Botão Primário: "Sim, ver modelos compatíveis" (Avança).
    *   Botão Secundário: "Voltar e escolher outro" (Correção).

### Etapa 3: Resultado e Conversão
O sistema bifurca a jornada baseada na certeza do usuário.

#### Cenário A: Caminho Feliz (Produto Identificado)
*   **Condição:** Usuário confirmou um formato conhecido.
*   **O que o usuário vê:**
    *   Ícone de Sucesso (Check Verde).
    *   Foto, Nome e Preço do produto recomendado.
*   **Ação Principal (Conversão Web):** Botão "Comprar Agora".
    *   *Comportamento:* Redireciona o usuário para a **Página do Produto** na Nuvemshop.
    *   *Fluxo Nuvemshop:* O usuário visualiza os detalhes na loja oficial, clica em "Comprar", calcula o frete e finaliza o pedido preenchendo seus dados de entrega e pagamento.
*   **Ação Secundária (Rede de Segurança):** Link "Tenho uma dúvida técnica".
    *   *Comportamento:* Abre o WhatsApp com a mensagem: *"Tenho dúvida sobre o modelo [Nome] ([Formato])."*

#### Cenário B: Caminho Consultivo (Incerteza)
*   **Condição:** Usuário selecionou "Não tenho certeza" ou o produto não foi encontrado.
*   **O que o usuário vê:**
    *   Ícone de Atenção (Câmera Amarela).
    *   Mensagem empática: "Vamos analisar juntos! Para evitar erros, envie uma foto...".
*   **Ação Única (Conversão WhatsApp):** Botão "Enviar Foto no WhatsApp".
    *   *Comportamento:* Abre o WhatsApp com a mensagem: *"Olá! Não sei o modelo do meu vaso e preciso de ajuda. Tenho uma foto."*

## 3. Processos e Integrações

### Backend / Logística (Headless)
O site atua como uma vitrine inteligente (Headless) que delega a transação para plataformas especializadas:

1.  **Nuvemshop (Checkout)**
    *   O site não processa pagamentos.
    *   Ele encaminha o cliente para a **Página do Produto** na Nuvemshop.
    *   **Vantagem:** O cliente finaliza a compra em um ambiente seguro, com cálculo automático de frete e opções de pagamento da plataforma.

2.  **WhatsApp (CRM/Vendas)**
    *   Atua como "balcão de loja virtual".
    *   As mensagens já chegam pré-formatadas (Contextualizadas), permitindo que o vendedor saiba exatamente em que ponto o cliente travou (se foi na escolha do modelo ou se é uma dúvida sobre um produto específico).

## 4. Diferenciais de UX
*   **Carga Cognitiva Mínima:** O usuário não navega por dezenas de produtos. O sistema *filtra* para ele.
*   **Prevenção de Erro:** O fluxo desencoraja a compra "no chute" ao oferecer o botão de "Não tenho certeza" com destaque, preferindo uma venda assistida a uma devolução futura.
*   **Mobile First:** Botões grandes e áreas de toque otimizadas para uso em celular, onde a maioria das compras ocorre.
