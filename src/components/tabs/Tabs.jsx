import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import FileUpload from "../upload-form/upload";
import MergeUpload from "../upload-form/merge";


export function TabsDefault() {
    const data = [
        {
            label: "Encode PDF",
            value: "encode",
            desc: ``,
            component: FileUpload,
        },
        {
            label: "Merge PDF",
            value: "merge",
            desc: ``,
            component: MergeUpload,
        },
    ];

    return (
        <Tabs value="encode">
            <TabsHeader>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, desc, component: Component }) => (
                    <TabPanel key={value} value={value}>
                        <p>{desc}</p>
                        {/* Dynamically render the FileUpload component */}
                        <Component />
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default TabsDefault;