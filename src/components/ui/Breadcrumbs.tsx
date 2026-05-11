import Link from "next/link";

export interface BreadcrumbURL {
  section?: string;
  subsection?: string;
  article?: string;
};

export default function Breadcrumbs(
    { URL }: { URL: BreadcrumbURL }
) {
  const { 
    section, 
    subsection, 
    article 
  } = URL;

  return (

    
    <nav className="text-sm text-muted-foreground mb-3" aria-label="breadcrumb">
        <Link href="/" className="hover:underline">
            home
        </Link>
        
        <Link href={`/${section}`} className="hover:underline">
            /
            {section}
        </Link>
        
        
        {subsection && (
            <Link href={`/${section}/${subsection}`} className="hover:underline">
                /
                {subsection}
            </Link>
        )}
        
        {article && (
            <span>
                /
                {article}
            </span>
        )}
    </nav>
  )
}
