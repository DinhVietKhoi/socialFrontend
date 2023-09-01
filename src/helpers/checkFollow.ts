export const checkFollow = (id: string, follow: string[]) => {
    const a = follow.filter((f: any) => f.followBy._id == id)
    
    // console.log(follow)
    // console.log(id)
    if (a.length > 0) {
        return true;
    }
    return false;
}