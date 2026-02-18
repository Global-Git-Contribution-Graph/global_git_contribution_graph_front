"use client";

import { BackgroundDots } from "../components/BackgroundDots";
import { StatsPanel } from "../components/StatsPanel";

export default function DashboardPage() {
    return (
        <BackgroundDots>
            <main className="p-6">
                <StatsPanel />
            </main>
        </BackgroundDots>
    );
}
