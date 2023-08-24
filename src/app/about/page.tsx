import BgProfileImage from "@/components/BgProfileImage";

const aboutList = [
    { category: "Name", value: process.env.NAME },
    { category: "Phone", value: process.env.PHONE_NUMBER },
    { category: "Email", value: process.env.EMAIL_ADDRESS },
    { category: "GitHub", value: process.env.GITHUB_URL, isLink: true },
];

export default function AboutPage() {
    return <div className="about">
        <section className="about--main">
            <h1 className="about--main__heading">About</h1>
            <div className="about--main__body">
                <BgProfileImage/>
                <ul>
                    {aboutList.map(item => (
                        <li>
                            <span>{item.category}:</span>
                            {item.isLink ? <a href={item.value}>{item.value}</a> : item.value}
                            {/* <span>{item.value}</span> */}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
        <section>
        <h1 className="about--main__heading">Skills</h1>
        </section>
        {/* <aside>
            <h2>Table of Contents</h2>
        </aside> */}
    </div>;
}