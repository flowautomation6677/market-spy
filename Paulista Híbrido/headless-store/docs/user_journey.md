# Documentação da Experiência do Usuário (UX) - Compra Híbrida

Este documento detalha a jornada do usuário no "Wizard de Recomendação", a experiência projetada e os processos técnicos do modelo implementado no site **Paulista.store**.

## 1. Visão Geral e Estratégia
O objetivo central é resolver a insegurança técnica do cliente na compra de um assento sanitário e aumentar o ticket médio através de ancoragem de preços.
A estratégia **Híbrida** combina:
*   **Autoatendimento Digital (Wizard)**: Identificação visual rápida e recomendação estratificada (Melhor, Básico, Luxo).
*   **Válvulas de Escape**: Recursos para recuperar usuários indecisos (Comparativo, WhatsApp, Catálogo Geral).

## 2. Passo a Passo da Jornada (Fluxo de Navegação)

A jornada foi otimizada de 3 para **2 etapas principais** para reduzir atrito.

### Etapa 1: Identificação Visual (O Funil)
*   **O que o usuário vê:** Uma pergunta direta "Qual o formato do seu vaso?" com opções visuais claras.
*   **Interação:** Botões grandes com ícones/fotos (Oval, Quadrado, Redondo, Outros).
*   **Objetivo:** Classificar o usuário tecnicamente em menos de 5 segundos.

### Etapa 2: O Dashboard de Resultados (A Conversão)
Ao selecionar um formato (ex: Quadrado), o usuário não vê apenas um produto, mas um **Ecossistema de Opções** desenhado psicologicamente:

#### A. O Herói ("Nossa Recomendação")
*   **Posição:** "Above the Fold" (Visível sem rolar a tela no mobile).
*   **Destaque:** Borda azul, selo "CAMPEÃO DE VENDAS", foto principal nítida.
*   **Conteúdo:**
    *   Prova Social: Estrelas (4.8/5) e número de avaliações.
    *   Benefícios: "Batida Suave", "Não cai", "Fácil Limpeza".
    *   Preço: De R$ 220 por **R$ 189,90** (Destaque visual).
*   **Ação:** Botão Verde Vibrante ("COMPRAR ESTE MODELO"). Leva direto ao checkout.

#### B. As Válvulas de Escape (Confiança)
Logo abaixo do botão de compra, links estratégicos para quem hesita:
1.  **Modal "Tira-Teima" (Comparativo):**
    *   *Link:* "Ver comparativo: Por que a versão Recomendada é melhor...?"
    *   *Ação:* Abre um modal com tabela simples comparando Barulho (Pá! vs Silêncio), Material (Plástico vs Rígido) e Garantia.
    *   *Objetivo:* Validar racionalmente a escolha do produto mais caro (Recomendado) sobre o Básico.
2.  **Opção Econômica (Ancoragem Inferior):**
    *   *Visual:* Card discreto, botão "Ghost" (transparente).
    *   *Copy:* "Versão Básica (Plástico PP)".
    *   *Objetivo:* Capturar o cliente sensível a preço (R$ 89,90) sem canibalizar a venda principal.
3.  **Opção de Luxo (Ancoragem Superior):**
    *   *Visual:* Card com borda dourada/amber.
    *   *Copy:* "Versão Luxo (Resina)".
    *   *Preço:* **R$ 409,90** (Visível e Grande).
    *   *Objetivo:* Fazer o preço de R$ 189,00 parecer barato ("Efeito Chamariz"). O botão leva ao WhatsApp com mensagem personalizada para customização de cor.

#### C. A Saída de Segurança
*   **Rodapé:** Link "Prefere escolher sozinho? Veja a lista completa".
*   **Objetivo:** Não aprisionar o usuário que quer navegar livremente (Modo Vitrine).

## 3. Elementos de UI/UX Detalhados

| Elemento | Função Psicológica | Comportamento Técnico |
| :--- | :--- | :--- |
| **Barra de Sucesso** | Feedback neutro | Cor Cinza/Azul (não compete com botão de compra). |
| **Botão de Compra** | Focalizar ação | Único elemento Verde/Laranja Vibrante na tela. |
| **Modal Tira-Teima** | Remover dúvida | Overlay escuro, foco na tabela, fecha ao clicar fora. |
| **Botão Zap (Luxo)** | Atendimento VIP | Abre API do WhatsApp com texto: *"Tenho interesse no Luxo..."*. |
| **Botão Zap (Dúvida)** | Rede de segurança | Sticky Footer ou botão "Não tenho certeza". |

## 4. Integrações
*   **Nuvemshop:** Os botões de compra (Recomendado e Básico) levam direto ao checkout/produto oficial.
*   **WhatsApp API:** Utilizado para dúvidas, personalização (Luxo) e envio de fotos (Não sei o modelo).
