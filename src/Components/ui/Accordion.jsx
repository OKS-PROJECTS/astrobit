import { Accordion as OksAccordion, AccordionItem } from "oks-ui";

/**
 * Accordion / collapse — now backed by oks-ui `Accordion` + `AccordionItem`
 * (shipped in 1.1.0). Astrobit keeps the `items` array API so the FAQ / release
 * pages stay stable.
 *
 * items: [{ id, title | question, content | answer, subtitle? }]
 */
export function Accordion({ items = [], defaultOpen = [], single = false }) {
  return (
    <OksAccordion
      selectionMode={single ? "single" : "multiple"}
      variant="light"
      defaultExpandedKeys={defaultOpen}
    >
      {items.map((it) => (
        <AccordionItem
          key={it.id}
          itemKey={it.id}
          title={it.title || it.question}
          subtitle={it.subtitle}
        >
          {it.content || it.answer}
        </AccordionItem>
      ))}
    </OksAccordion>
  );
}
