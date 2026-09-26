import { Card, CardContent, CardFooter, CardHeader, Skeleton } from "curiouslycory.com";

export const PostCardLoading = () => (
  <Card className="w-full max-w-sm overflow-hidden pt-0">
    <Skeleton className="h-48 w-full rounded-none" />
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-48" />
    </CardContent>
    <CardFooter className="gap-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-5 w-12" />
    </CardFooter>
  </Card>
);

export const AuthorRow = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="size-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);

export const Shapes = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="h-6 w-20" />
    <Skeleton className="size-10 rounded-full" />
    <Skeleton className="h-9 w-32 rounded-md" />
  </div>
);

export const Dark = () => (
  <div className="dark bg-background text-foreground flex w-full max-w-md flex-col gap-6 rounded-lg p-6">
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
    <Card className="w-full overflow-hidden pt-0">
      <Skeleton className="h-48 w-full rounded-none" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-48" />
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-12" />
      </CardFooter>
    </Card>
  </div>
);
