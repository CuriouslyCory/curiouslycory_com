import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "curiouslycory.com";

export const BlogArchive = () => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#blog?page=1" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=1">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=2" isActive>
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=3">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#blog?page=3" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export const FirstPage = () => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          href="#"
          aria-disabled
          className="pointer-events-none opacity-50"
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=1" isActive>
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=2">2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=3">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#blog?page=2" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export const LongArchive = () => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#blog?page=6" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=1">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=7" isActive>
          7
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#blog?page=12">12</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#blog?page=8" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground w-full rounded-lg p-6">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#blog?page=1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#blog?page=1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#blog?page=2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#blog?page=3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#blog?page=12">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#blog?page=3" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
);
