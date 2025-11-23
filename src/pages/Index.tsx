import { useState, useMemo } from "react";
import { TextInput } from "@/components/TextInput";
import { FormattedPreview } from "@/components/FormattedPreview";
import { ExportButton } from "@/components/ExportButton";
import { parseText } from "@/lib/textParser";

const defaultText = `UNIT – 5: FILE HANDLING & I/O STREAMS

1. Java I/O Streams – Concepts & Types (10 Marks)

10-MARK ANSWER

Java I/O (Input/Output) streams are mechanisms used to read data from sources and write data to destinations like files, networks, keyboards, etc.

Java treats every input/output operation as a stream of data.

Types of Streams

1. Byte Streams
Used to read/write binary data.
Classes:
- FileInputStream
- FileOutputStream

2. Character Streams
Used to read/write character data.
Classes:
- FileReader
- FileWriter

3. Buffered Streams
Used to improve performance by reducing physical reads/writes.
Classes:
- BufferedReader
- BufferedWriter
- BufferedInputStream

4. Data Streams
Used to read/write primitive data types.
Classes:
- DataInputStream
- DataOutputStream

5. Object Streams
Used for object serialization.
Classes:
- ObjectInputStream
- ObjectOutputStream

Advantages

- Promotes modular input/output
- Supports various data formats
- Highly efficient with buffering
- Supports character encoding

PROGRAM (Simple Read & Write using FileInputStream/FileOutputStream)

import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Write to File
        FileOutputStream fout = new FileOutputStream("test.txt");
        fout.write("Hello SJ!".getBytes());
        fout.close();

        // Read from File
        FileInputStream fin = new FileInputStream("test.txt");
        int i;
        while((i = fin.read()) != -1) {
            System.out.print((char)i);
        }
        fin.close();
    }
}

2. FileInputStream & FileOutputStream (10 Marks)

10-MARK ANSWER

These byte stream classes are used for reading and writing raw binary data.

FileInputStream

Used to read bytes from a file.

Methods:
- read()
- available()
- close()

FileOutputStream

Used to write bytes to a file.

Methods:
- write(int byte)
- write(byte[] array)
- close()

Advantages

- Best for images, audio, PDF, binary files
- Direct byte-level operations
- Fast and efficient

PROGRAM

import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Writing data
        FileOutputStream fout = new FileOutputStream("data.txt");
        String msg = "Java FileOutputStream Example";
        fout.write(msg.getBytes());
        fout.close();

        // Reading data
        FileInputStream fin = new FileInputStream("data.txt");
        int x;
        while ((x = fin.read()) != -1) {
            System.out.print((char)x);
        }
        fin.close();
    }
}

3. FileReader & FileWriter (10 Marks)

10-MARK ANSWER

These are character streams, used to handle text files (Unicode supported).

FileReader

Reads characters from a file.

Methods:
- read()
- close()

FileWriter

Writes characters to a file.

Methods:
- write()
- append()
- close()

Advantages

- Supports Unicode
- Good for text files
- Easy handling of characters

PROGRAM

import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        FileWriter fw = new FileWriter("note.txt");
        fw.write("Hello SK! FileWriter example.");
        fw.close();

        FileReader fr = new FileReader("note.txt");
        int c;
        while ((c = fr.read()) != -1) {
            System.out.print((char)c);
        }
        fr.close();
    }
}

4. BufferedReader & BufferedWriter (10 Marks)

10-MARK ANSWER

Buffered Streams provide fast I/O operations by reducing disk access.

BufferedReader

Reads text efficiently using a buffer.

Methods:
- readLine() – reads entire line
- read()
- close()

BufferedWriter

Writes text efficiently using a buffer.

Methods:
- write()
- newLine()
- flush()
- close()

Advantages

- Faster than FileReader/FileWriter
- Reads whole lines
- Best for large text files

PROGRAM

import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedWriter bw = new BufferedWriter(new FileWriter("buffer.txt"));
        bw.write("This is a buffered writer example.");
        bw.newLine();
        bw.write("Fast and efficient!");
        bw.close();

        BufferedReader br = new BufferedReader(new FileReader("buffer.txt"));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
        br.close();
    }
}

5. Serialization & Deserialization (10 Marks)

10-MARK ANSWER

Serialization → Converting an object into a stream of bytes.
Deserialization → Restoring the object from the byte stream.

Used for:
- Storing objects in files
- Sending objects over network
- Deep copying

Steps for Serialization

1. Class must implement Serializable
2. Use ObjectOutputStream
3. Write object using writeObject()

Steps for Deserialization

1. Use ObjectInputStream
2. Read object using readObject()

PROGRAM

import java.io.*;

class Student implements Serializable {
    int id;
    String name;
    Student(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {

        // Serialization
        ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("obj.txt"));
        Student s1 = new Student(101, "SJ");
        out.writeObject(s1);
        out.close();

        // Deserialization
        ObjectInputStream in = new ObjectInputStream(new FileInputStream("obj.txt"));
        Student s2 = (Student) in.readObject();
        in.close();

        System.out.println("ID: " + s2.id);
        System.out.println("Name: " + s2.name);
    }
}

UNIT – 5 COMPLETED

All topics covered with:
- 10-mark answers
- Java Programs
- Exam-ready format`;

const Index = () => {
  const [inputText, setInputText] = useState(defaultText);

  const parsedContent = useMemo(() => {
    return parseText(inputText);
  }, [inputText]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">TOMO MEOW</h1>
            <p className="text-sm text-cement-gray mt-0.5">
              Premium Text Formatter
            </p>
          </div>
          <ExportButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 divide-x divide-border">
        <TextInput value={inputText} onChange={setInputText} />
        <FormattedPreview parsedContent={parsedContent} />
      </div>
    </div>
  );
};

export default Index;
