# Documentação da Experiência do Usuário (UX) - Compra Híbrida

Este documento detalha a jornada do usuário no "Wizard de Recomendação", a experiência projetada e os processos técnicos do modelo implementado no site **Paulista.store**.

## 1. Visão Geral e Estratégia
O objetivo central é resolver a insegurança técnica do cliente na compra de um assento sanitário e aumentar o ticket médio através de ancoragem de preços.
A estratégia **Híbrida** combina:
*   **Autoatendimento Digital (Wizard)**: Identificação visual rápida (30s) e recomendação estratificada (Melhor, Básico, Luxo).
*   **Válvulas de Escape**: Recursos para recuperar usuários indecisos (Comparativo, WhatsApp, Catálogo Geral).

## 2. Passo a Passo da Jornada (Fluxo de Navegação)

A jornada foi otimizada para **2 etapas principais** para reduzir atrito, com foco Mobile-First.

### Etapa 1: Identificação Visual (O Funil)
*   **O que o usuário vê:** Uma pergunta direta "Qual o formato do seu vaso?" com opções visuais claras.
*   **Interação:** Botões grandes (Cards) com ícones/fotos:
    *   **Oval** (Formato de Ovo)
    *   **Quadrado / Reto**
    *   **Redondo** (Padrão)
    *   **Outros Formatos**
*   **Objetivo:** Classificar o usuário tecnicamente em menos de 5 segundos.

### Etapa 2: O Dashboard de Resultados (A Conversão)
Ao selecionar um formato (ex: Quadrado), o usuário é levado imediatamente ao resultado. Não há tela de "carregando" intrusiva, é instantâneo.

#### A. O Feedback de Sucesso
*   **Barra Superior:** "✓ Modelos compatíveis com VASO [FORMATO]".
*   **Objetivo:** Confirmação imediata para reduzir ansiedade.

#### B. O Herói ("Nossa Recomendação")
*   **Posição:** "Above the Fold".
*   **Visual:** Borda verde/azul, selo "🏆 73% dos clientes escolhem este".
*   **Galeria Interativa:**
    *   Carrossel de imagens com *swipe* (arrastar) em mobile.
    *   Zoom (Lightbox) ao clicar na imagem para ver detalhes do acabamento.
*   **Conteúdo:**
    *   Prova Social: Estrelas (4.8/5) e "42 avaliações".
    *   Destaques: "Com Fechamento Suave (Soft Close)", "Injetado Rígido".
    *   Preço: De Ancoragem por **Preço Oferta** (ex: R$ 189,xx).
*   **Ação Principal:** Botão Verde Vibrante com Gradiente ("💬 COMPRAR PELO WHATSAPP >>").
    *   *Comportamento:* Já reporta a conversão ao Google Ads antes de abrir o WhatsApp.

#### C. As Válvulas de Escape (Confiança)
Logo abaixo do botão de compra, links estratégicos:

1.  **Modal "Tira-Teima" (Comparativo In-Line):**
    *   *Link:* "🔍 Por que este custa mais que o básico?"
    *   *Ação:* Abre um modal com tabela comparando:
        *   **Barulho:** Pá! (Básico) vs Silêncio (Recomendado/Soft Close).
        *   **Material:** Plástico Fino vs Injetado Rígido.
        *   **Garantia:** 3 meses vs 1 ano.
    *   *Objetivo:* Validar racionalmente o upsell.

2.  **Opção de Luxo (Upsell de Desejo):**
    *   *Visual:* Card com borda dourada/amber, título "✨ Quer algo exclusivo?".
    *   *Copy:* "Versão Luxo em Resina".
    *   *Preço:* Alto valor (ex: R$ 409,90) para ancorar o recomendado como "barato".
    *   *Ação:* **Link para a Galeria (`/galeria`)**.
    *   *Objetivo:* Levar o usuário que busca estética para uma experiência visual mais rica.

3.  **Opção Econômica (Downsell):**
    *   *Visual:* Card discreto, borda tracejada, tag "ECONÔMICO".
    *   *Alertas:* Lista de trade-offs com ícones de alerta (⚠️) explícitos (ex: "Tampa bate").
    *   *Ação:* Botão secundário "ESCOLHER MESMO ASSIM".
    *   *Objetivo:* Capturar o cliente sensível a preço sem incentivar a escolha (fricção cognitiva).

#### D. A Saída de Segurança (Persistent Footer)
*   **Sticky Footer:** Uma barra fixa no rodapé mobile.
*   **Conteúdo:** Foto de atendente (humano) + "Ainda na dúvida?".
*   **Ação:** Botão "📷 Falar com Atendente". Envia mensagem personalizada no WhatsApp ("Estou vendo os modelos para vaso X mas tenho dúvida").

## 3. Identidade Visual e UI (Design System)

O app utiliza uma estética **Clean & Trustworthy** (Limpa e Confiável).

### Cores Principais
*   **Verde (Ação/Sucesso):** `green-600` a `green-500`. Usado exclusivamente para compra e confirmação positiva.
*   **Azul (Institucional/Confiança):** `blue-600`. Usado na marca (Paulista**.store**) e links informativos.
*   **Amber/Dourado (Luxo/Atenção):** `amber-500`/`yellow-400`. Usado para estrelas, opção Luxo e selos de "Campeão".
*   **Cinza/Slate (Estrutura):** `slate-50` a `slate-900`. Fundo e textos.

### Tipografia
*   **Font:** Sans-serif moderna (Inter/System stack).
*   **Pesos:**
    *   *Bold/Extrabold:* Títulos e Preços.
    *   *Medium/Regular:* Textos explicativos.

### Elementos de UI
*   **Cards:** Bordas arredondadas (`rounded-xl` ou `rounded-2xl`), sombras suaves (`shadow-sm` a `shadow-xl`).
*   **Micro-interações:**
    *   `hover:scale-105` nos botões principais.
    *   `AnimatePresence` (Framer Motion) para transições suaves entre passos e modais.
    *   Skeleton loading / Pulse effect em imagens.

## 4. Integrações Técnicas
*   **Nuvemshop:** Checkouts gerados via link direto (`getCheckoutUrl`).
*   **Google Ads:** Disparo de evento `conversion` no clique do botão de compra.
*   **WhatsApp API:** Links dinâmicos com mensagens pré-populadas baseadas no contexto (Formato escolhido ou Dúvida genérica).
