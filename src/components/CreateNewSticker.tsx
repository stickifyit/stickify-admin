import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/src/components/ui/dialog"
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import axios from 'axios'
import { useCurrentContainer } from '@/store/currentContainer'
  
type Props = {}

const CreateNewSticker = (props: Props) => {
    const [file, setFile] = React.useState<File | null>(null)
    const [name, setName] = React.useState("")
    const [keywords, setKeywords] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [image,setImage]= React.useState<string | null>()
    const [open, setOpen] = React.useState(false)
    const {setReload} = useCurrentContainer()
    const [loading,setLoading]=React.useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          setImage(imageDataUrl);
        };
  
        reader.readAsDataURL(file);
      }
    };
    const handleOpen = ()=>{
        setFile(null);
        setName("")
        setKeywords("")
        setDescription("")
        setImage(null)
        setOpen(true)
    }


    const handleCreate = async() => {
                setLoading(true)
                if (!file) {
                    console.error("No file selected.");
                    return;
                }

                // Use FormData to send the file to the server
                const formData = new FormData();
                formData.append("image", file);
                formData.append("folder", "stickers");

                // Use fetch to send the form data to the server
                await fetch("http://localhost:3001/images/upload", {
                    method: "POST",
                    body: formData,
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.name)
                    axios.post("http://localhost:3001/sticker/create", {
                        name,
                        keywords: keywords.includes(",")?keywords.split(","):[keywords??""],
                        description,
                        pack: "test pack",
                        imageURL: data.name,
                        category: "test category",
                    }).then((res)=>{
                        setOpen(false)
                        setReload(Math.random())
                        setLoading(false)
                    })
                })
                .catch((error) => {
                console.error("Error uploading image:", error);
                });
    }
  return (
        <Dialog open={open}>
        <DialogTrigger>
                <Button onClick={handleOpen} className='' size={"lg"}>Create new</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>New Sticker</DialogTitle>
            <DialogDescription>
                <div className='flex flex-col gap-2 mt-6'>
                    {
                        image &&
                        <img src={image??""} className='aspect-square w-[200px] m-2 mx-auto  rounded-xl'  alt="" />
                    }
                    <Input value={name} onInput={(e: any) => setName(e.target.value)} placeholder='name'/>
                    <Input accept='image/*' onChange={(e) => handleImageChange(e)} type='file' placeholder='e.g. sticker.png'/>
                    <Input value={keywords} onInput={(e:any) => setKeywords(e.target.value)} placeholder='keywords'/>
                    <Textarea value={description} onInput={(e:any) => setDescription(e.target.value)} placeholder='description'/>
                    <Button disabled={loading} onClick={handleCreate}>
                        {loading ? "Loading..." : "Create"}
                    </Button>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
  )
}

export default CreateNewSticker