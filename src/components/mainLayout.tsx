import { Section, TopBar } from "../components";
import { Box } from "@mui/material";
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Box sx={{ height: "100vh", minWidth: "500px", overflow: "scroll" }}>
            <TopBar />
            <Section>
                {children}
            </Section>
        </Box>

    );
};

export default MainLayout;
