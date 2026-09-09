import { Accordion } from "./hooks/AccordionContext";

export const AccordionGroupHandler = () => {
    return (
        <>
            <Accordion defaultValue={'item1'} allowedMultiple={true}>
                <Accordion.Item value={'item1'} disabled={false}>
                    <Accordion.Trigger>Test 1</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            React is a JavaScript library for building user interfaces, particularly
                            web applications.
                        </p>
                        <p>
                            It was developed by Facebook and is now maintained by Meta and the
                            community.
                        </p>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="item2">
                    <Accordion.Trigger>What are compound components?</Accordion.Trigger>
                    <Accordion.Content>
                        <p>
                            Compound components are a pattern where components work together to form
                            a complete UI.
                        </p>
                        <ul>
                            <li>They share state implicitly</li>
                            <li>They provide a flexible API</li>
                            <li>They encapsulate complex logic</li>
                        </ul>
                    </Accordion.Content>
                </Accordion.Item>


                <Accordion.Item value="item3" disabled>
                    <Accordion.Trigger>This item is disabled</Accordion.Trigger>
                    <Accordion.Content>
                        <p>This content won't be shown because the item is disabled.</p>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>

        </>
    );
}
