export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="h-dvh w-full overflow-hidden overscroll-none">{children}</div>;
}
