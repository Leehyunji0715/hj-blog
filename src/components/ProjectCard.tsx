import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, LinkIcon } from "./icons";
import { ProjectData } from "@/model/Project";
import Chip from "./Chip";

type Props = ProjectData;

export default function ProjectCard({
  title, description, image, teckStacks, link
}: Props) {
    return <div className="project-card">
        <Image src={image} width={300} height={200} alt={`image of ${title}`} className='project-card__img'/>
          <div className='project-card__information'>
            <h2>{title}</h2>
            <p className='project-card__description'>{description}</p>
            <div className="project-card__list">{teckStacks.map(item => <Chip key={item} text={item}/>)}</div>
            {
              link && <div className="project-card__list">
                <Link href={link.github} target='_blank'><GitHubIcon/></Link>
                {link.deployed && <Link href={link.deployed} target='_blank'><LinkIcon/></Link>}
              </div>
            }
        </div>
    </div>
}