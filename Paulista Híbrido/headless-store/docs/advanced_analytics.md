# Rastreamento Avançado (Server-Side)

## API Secret do Measurement Protocol
**Chave Criada:** `NqZbwTx6RJmmEUS8417SNA` (Apelido: WIZARD pAULISTA)
**Data:** 12/jan/2026

### Para que serve essa chave?
Esta chave permite enviar eventos para o Google Analytics 4 (GA4) **diretamente do servidor**, sem depender do navegador do usuário.

### Quando usar?
No momento, seu rastreamento é **Client-Side** (GTM no navegador), o que é suficiente para:
- Cliques em botões.
- Visualização de páginas.
- Seleção de produtos.

**Esta chave será crucial no futuro para:**
1.  **Bot de Finanças/Vendas**: Quando o bot confirmar que o PIX realmente caiu na conta, ele pode usar essa chave para avisar o GA4: "Olha, aquela conversão virou dinheiro real de R$ 97,00".
2.  **CRM**: Se você usar um CRM, ele pode enviar atualizações de status do lead.
3.  **Redundância**: Se o usuário usar AdBlock agressivo, o envio via servidor garante que o dado chegue.

### Como usar (Exemplo Técnico)
Para enviar um evento via API (Node.js/Python):

```bash
POST /mp/collect?measurement_id=G-XXXXXX&api_secret=NqZbwTx6RJmmEUS8417SNA
Host: www.google-analytics.com
Content-Type: application/json

{
  "client_id": "client_id_do_usuario",
  "events": [{
    "name": "purchase_confirmed",
    "params": {
      "currency": "BRL",
      "value": 97.00
    }
  }]
}
```

> **Recomendação:** Mantenha esta chave salva com segurança (env vars). Não exponha ela no código público do front-end (`page.tsx` ou `layout.tsx`).
