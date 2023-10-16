import { useState } from "react";
import Markdown from 'markdown-to-jsx';
import Chip from '../Chip';
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import P from "./P";
import Ul from "./Ul";

type Props = {
    content: string;
    onChange: (content: string) => void;
}

export default function MDXEditor({ content, onChange }: Props) {
    const [value, setValue] = useState(content);

    return (
        <section style={{ display: 'flex', gap: '2rem', fontSize: '1.2rem' }}>
            <textarea 
                id="my-text-area"
                value={value} 
                style={{ width: '100%', padding: '2rem' }}
                rows={20}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            />
            <div className='md-preview' style={{ flex: '0 0 50%', overflow: 'hidden auto' }}>
                <Markdown
                    className="mdx m-0"
                    children={value}
                    options={{
                        overrides: {
                            h1: { component: H1 },
                            h2: { component: H2 },
                            h3: { component: H3 },
                            p: { component: P },
                            ul: { component: Ul },
                            Chip: {
                                component: Chip
                            }
                        }
                    }}
                />
            </div>
        </section>
    )
}